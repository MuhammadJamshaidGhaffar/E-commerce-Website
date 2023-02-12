import productModel from "@/utils/product";
import { NextApiRequest, NextApiResponse } from "next";
import { products, users } from "../../utils/data";
import db from "../../utils/db";
import UserModel from "../../utils/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let response = "";
  await db.connect();
  const query = req.query;
  if (query.users == "true") {
    console.log("Seeding db with users");
    console.log(await UserModel.insertMany(users));
    response += "\nDatabase seeded with users succesfully";
  }
  if (query.products == "true") {
    console.log("Seeding db with products");
    console.log(await productModel.insertMany(products));
    response += "\nDatabase seeded with products succesfully";
  }
  res.end(response);
  await db.disconnect();
}
