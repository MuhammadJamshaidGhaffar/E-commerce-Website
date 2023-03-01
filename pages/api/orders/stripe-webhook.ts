import db from "@/utils/db";
import orderModel from "@/utils/order";
import { NextApiRequest, NextApiResponse } from "next";
import stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_API_KEY;
// const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const stripeWebhookSecret = "whsec_46KMnxT40ILwUjUapLLRS1Bg9nJJGZKp";

const stripeClient = new stripe(stripeSecretKey, {
  apiVersion: "2022-11-15",
});

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const sig = req.headers["stripe-signature"];

  console.log("sginatiure", sig);

  let event;

  try {
    // console.log("req  :  ", req);
    console.log("before buffer");
    const buf = await buffer(req);
    console.log("after buffer");
    event = stripeClient.webhooks.constructEvent(buf, sig, stripeWebhookSecret);
    console.log("after event signature verifcation");
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log("before switch");
  switch (event.type) {
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    //            code for when payment is created by stripe.paymentIntents.create

    // case "payment_intent.canceled": {
    //   console.log("payment_intent.canceled is triggered");
    //   const paymentIntentCanceled = event.data.object;
    //   // Then define and call a function to handle the event payment_intent.canceled
    //   const orderId = paymentIntentCanceled.metadata.orderId;
    //   await updateOrderStatus(orderId, false);

    //   break;
    // }
    // case "payment_intent.succeeded": {
    //   console.log("payment_intent.succeeded triggered");
    //   const paymentIntentSucceeded = event.data.object;
    //   // Then define and call a function to handle the event payment_intent.succeeded
    //   const orderId = paymentIntentSucceeded.metadata.orderId;
    //   console.log(paymentIntentSucceeded);
    //   console.log("order Id : ", orderId);
    //   // if (paymentIntentSucceeded.payment_status === "paid") {
    //   await updateOrderStatus(orderId, true);
    //   console.log("payment made successfully");
    //   // } else {
    //   // await updateOrderStatus(orderId, false);
    //   // console.log("payment failed but success event was triggered");
    //   // }

    //   break;
    // }

    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    //   Code for payment is created by stripe.checkout.sessions.create

    case "checkout.session.completed": {
      const session = event.data.object;
      const orderId = session.metadata.orderId;
      if (session.payment_status === "paid") {
        console.log(`Payment made successfully for order id : ${orderId}`);
        await updateOrderStatus(orderId, true);
      } else {
        console.log(`Payment failed for order id : ${orderId}`);
        await updateOrderStatus(orderId, false);
      }

      break;
    }
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }

  res.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};

async function updateOrderStatus(orderId: string, isPaid: boolean) {
  await db.connect();
  await orderModel.findOneAndUpdate(
    { _id: orderId },
    { isPaid, paidAt: new Date() }
  );
}

// // Handle the checkout.session.completed event
// if (event.type === "checkout.session.completed") {
//   const session = event.data.object;
//   // Check if the payment was successful
//   if (session.payment_status === "paid") {
//     // Payment successful, fulfill the order or provide access to the purchased product
//     console.log("paid");
//     await db.connect();

//     const { id } = req.query;
//     const order = await orderModel.findOneAndUpdate(
//       { _id: id },
//       { isPaid: true, paidAt: new Date() }
//     );
//   } else {
//     // Payment failed, handle the failure appropriately
//     console.log("FAILED");
//   }
// }
