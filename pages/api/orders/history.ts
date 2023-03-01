import db from "@/utils/db";
import orderModel from "@/utils/order";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(401).send({ msg: "sigin required!" });

  try {
    const { user } = session;
    await db.connect();
    const orders = await orderModel.find({ user: user._id });
    await db.disconnect();
    res.send(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}
