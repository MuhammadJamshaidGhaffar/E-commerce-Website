import db from "@/utils/db";
import UserModel from "@/utils/user";
import { NextApiRequest, NextApiResponse } from "next";
import bycryptjs from "bcryptjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") return;

  const { name, email, password } = req.body;
  if (
    !name ||
    !email ||
    !email.includes("@") ||
    !password ||
    password.length < 5
  ) {
    res.status(422).json({
      message: "Validation error",
    });
  }

  await db.connect();

  console.log(req.body);

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    res.status(422).json({
      message: "User already exists",
    });
  }

  const newUser = new UserModel({
    name,
    email,
    password: bycryptjs.hashSync(password),
    isAdmin: true,
    image:
      "https://scontent-mct1-1.xx.fbcdn.net/v/t39.30808-1/320631754_462787592677275_3400737354263707890_n.jpg?stp=c0.33.320.320a_dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeH9BDdglkKMswDhUEgORU0PLU7nrewH13gtTuet7AfXeFB3QqPNWF4EQlCTAQ5tqndi45wOTvImToa7s5fLjGQS&_nc_ohc=6_4AnLMh7zMAX8q5XYg&_nc_ht=scontent-mct1-1.xx&oh=00_AfBqF8KsXSkv-8SU0onZVz005NcGn6tyZrR-ltXUxOvYeg&oe=63F457C8",
  });
  const user = await newUser.save();
  await db.disconnect();

  res.status(201).json({
    message: "Created user!",
    ...user,
  });
}
