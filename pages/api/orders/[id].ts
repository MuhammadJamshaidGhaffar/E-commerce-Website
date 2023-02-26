import db from "@/utils/db";
import orderModel from "@/utils/order";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(401).send("Signin Required");

  await db.connect();
  const order = await orderModel.findById(req.query.id);
  await db.disconnect();
  res.send(order);
}
