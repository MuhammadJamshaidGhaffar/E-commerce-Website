import { NextApiRequest, NextApiResponse } from "next";
import db from "@/utils/db";
import productModel from "@/utils/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id } = req.query;
  await db.connect();
  try {
    const product = db.convertDocToObj(
      await productModel.findOne({ _id }).lean()
    );
    res.status(200).json(product);
  } catch (err) {
    res.status(500).end(err.message);
  }
}
