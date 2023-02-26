import { UserType } from "@/utils/data";
import db from "@/utils/db";
import UserModel from "@/utils/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bycryptjs from "bcryptjs";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        if (!credentials) return null;
        await db.connect();
        const user = await UserModel.findOne<UserType>({
          email: credentials.email,
        });

        if (
          user &&
          bycryptjs.compareSync(credentials.password, user.password)
        ) {
          return {
            _id: user._id,
            email: user.email,
            name: user.name,
            image: user.image,
            isAdmin: user.isAdmin,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("Inside token : ", token, user);
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token, user }) {
      // console.log("Inside session : ", session, token, user);
      if (token._id) session.user._id = token._id;
      if (token.isAdmin) session.user.isAdmin = token.isAdmin;
      // console.log("session gaian :", session);
      return session;
    },
  },
});
