import { NextApiRequest, NextApiResponse } from "next";
import stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_API_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripeClient = new stripe(stripeSecretKey, {
  apiVersion: "2022-11-15",
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripeClient.webhooks.constructEvent(
      req.body,
      sig,
      stripeWebhookSecret
    );
  } catch (err) {
    console.error(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // Check if the payment was successful
    if (session.payment_status === "paid") {
      // Payment successful, fulfill the order or provide access to the purchased product
      console.log("paid");
    } else {
      // Payment failed, handle the failure appropriately
      console.log("FAILED");
    }
  }

  res.json({ received: true });
}
