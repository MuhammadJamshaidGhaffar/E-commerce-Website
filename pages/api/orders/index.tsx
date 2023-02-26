import db from "@/utils/db";
import orderModel from "@/utils/order";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await db.connect();
  const session = await getSession({ req });
  if (!session) return res.status(401).send("Signin Required");
  const { user } = session;
  if (!user) return res.status(401).send("Signin Required");
  const newOrder = new orderModel({
    ...req.body,
    user: user._id,
  });

  const order = await newOrder.save();
  res.status(201).send(order);
}
