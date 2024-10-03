// /pages/api/webhooks.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { supabase } from '@/lib/supabaseClient'; // Your Supabase client

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export const config = {
  api: {
    bodyParser: false, // Stripe requires the raw body to validate webhook signatures
  },
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Get the customer email and update Supabase user profile with payment status
    const { email } = session.customer_details;

    // You can use Supabase client here to update user's subscription status
    await supabase
      .from('profiles')
      .update({ subscription_status: 'active' })
      .eq('email', email);
  }

  res.status(200).send({ received: true });
}

export default handler;
