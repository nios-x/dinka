import { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import bcrypt from "bcrypt";

export default {
  providers: [
    Credentials({
      id: "email-password",
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || user.provider !== "Email") return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.password!
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          provider: user.provider,
        };
      },
    }),

    Credentials({
      id: "email-otp",
      name: "Email + OTP",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp || !credentials?.password)
          return null;

        const otpRecord = await prisma.oTPTable.findFirst({
          where: {
            email: credentials.email,
            otp: credentials.otp,
            expiry: { gt: new Date(Date.now() - 5 * 60 * 1000) }, // valid for 5 minutes
          },
        });
        if (!otpRecord) return null;

        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(
          credentials.password as string,
          salt
        );

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              provider: "Email",
              password: hashedPassword,
            },
          });
        }

        await prisma.oTPTable.deleteMany({
          where: {
            email: credentials.email,
            expiry: { lt: new Date() },
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          provider: user.provider,
        };
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
} satisfies NextAuthConfig;
