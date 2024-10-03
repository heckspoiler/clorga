// /pages/api/create-checkout-session.ts
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe/stripe.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, tier } = req.body;

    let priceId;
    switch (tier) {
      case 0: // Starter
        priceId = 'price_XXX'; // Replace with the actual Starter price ID
        break;
      case 1: // Small Business
        priceId = 'price_YYY'; // Replace with Small Business price ID
        break;
      case 2: // Enterprise
        priceId = 'price_ZZZ'; // Replace with Enterprise price ID
        break;
      default:
        return res.status(400).json({ error: 'Invalid tier selected' });
    }

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: email, // Associate session with user's email
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
