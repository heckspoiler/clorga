import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/client';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY || '', {
  apiVersion: '2024-09-30.acacia' || '',
});
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

// Initialize Supabase client with type support
const supabase = createClient();

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  let event: Stripe.Event;

  // Verify Stripe event is legitimate
  try {
    if (!signature || !webhookSecret) {
      throw new Error('Missing Stripe signature or webhook secret');
    }

    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const data = event.data.object as Stripe.Checkout.Session;
  const eventType = event.type;

  try {
    switch (eventType) {
      case 'checkout.session.completed': {
        // First payment is successful, and a subscription is created
        const session = await stripe.checkout.sessions.retrieve(data.id, {
          expand: ['line_items'],
        });

        const customerId = session.customer as string;
        const customer = await stripe.customers.retrieve(customerId as string);

        // Use type narrowing to check if the customer is not a deleted customer
        if (customer.deleted) {
          console.error('Customer has been deleted');
          throw new Error('Customer has been deleted');
        }

        const customerEmail = (customer as Stripe.Customer).email;

        if (!customerEmail) {
          console.error('No email found for the customer');
          throw new Error('No email found for the customer');
        }

        // Fetch or create user in Supabase
        let user;
        const { data: existingUser, error: fetchError } = await supabase
          .from('users')
          .select('*')
          .eq('email', customer.email)
          .single();

        if (fetchError && fetchError.code === 'PGRST116') {
          // User not found, create a new one
          const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([
              {
                email: customer?.email,
                full_name: customer?.name || '',
                customer_id: customerId,
                has_access: true,
              },
            ])
            .select('*')
            .single();

          if (insertError) throw new Error(insertError.message);

          user = newUser;
        } else if (existingUser) {
          user = existingUser;
        } else {
          throw new Error('Error fetching user');
        }

        let priceId;

        if (session) {
          priceId = session?.line_items?.data[0]?.price?.id ?? '';
        }
        const { error: updateError } = await supabase
          .from('users')
          .update({
            price_id: priceId,
            has_access: true,
          })
          .eq('email', customer.email);

        if (updateError) throw new Error(updateError.message);

        break;
      }

      case 'customer.subscription.deleted': {
        // Revoke access to the product
        const subscription = await stripe.subscriptions.retrieve(
          data.id as string
        );

        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('customer_id', subscription.customer as string)
          .single();

        if (error || !user) {
          console.error('User not found for customer:', subscription.customer);
          throw new Error('User not found');
        }

        // Revoke access
        const { error: updateError } = await supabase
          .from('users')
          .update({
            has_access: false,
          })
          .eq('customer_id', subscription.customer as string);

        if (updateError) throw new Error(updateError.message);

        break;
      }

      default:
        console.warn(`Unhandled event type: ${eventType}`);
        break;
    }
  } catch (e: any) {
    console.error(`Stripe error: ${e.message} | EVENT TYPE: ${eventType}`);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }

  return NextResponse.json({});
}
