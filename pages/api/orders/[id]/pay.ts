import db from "@/utils/db";
import orderModel from "@/utils/order";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const stripe = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: "2022-11-15",
    });
    const { id } = req.query;

    await db.connect();

    const order = await orderModel.findOne({ _id: id });

    if (!order) {
      res.status(404).send({
        msg: "Invalid order Id",
      });
    }
    // console.log(order.totalPrice);

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Total Price",
            },
            unit_amount: order.totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.HOST}/order/${id}`,
      cancel_url: `${process.env.HOST}/order/${id}`,
      metadata: {
        orderId: id,
      },
    });

    res.status(303).json({
      url: session.url,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}
