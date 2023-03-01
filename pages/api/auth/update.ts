import db from "@/utils/db";
import UserModel from "@/utils/user";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import bycryptjs from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "PUT")
    return res.status(400).send({ message: `${req.method} not supported` });

  const session = await getSession({ req });
  if (!session) res.status(401).send({ message: "signin required" });

  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    (password && password.length < 5)
  )
    return res.status(422).json({
      message: "Validation error",
    });

  await db.connect();

  const user = await UserModel.findOne({ _id: session.user._id });
  user.name = name;
  user.email = email;

  if (password) {
    user.password = bycryptjs.hashSync(password);
  }
  await user.save();
  await db.disconnect();
  return res.send({ message: "user updated" });
}
