import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
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

        console.log("creds", user)
        if (!user || user.provider !== "Email") return null;

        const isValid = await bcrypt.compare(credentials.password, user.password!);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          provider: user.provider,
        }
      },
    }),

    CredentialsProvider({
      id: "email-otp",
      name: "Email + OTP",
      credentials: {
        email: { label: "Email", type: "text" },
        otp: { label: "OTP", type: "text" },
        password: { label: "Password", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.otp || !credentials?.password) return null;

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
        const hashedPassword = await bcrypt.hash(credentials.password, salt);

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

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        if (!profile?.email) return false;

        const user = await prisma.user.findUnique({
          where: { email: profile.email },
        });

        if (!user) {
          await prisma.user.create({
            data: {
              email: profile.email,
              provider: "Google",
              //@ts-ignore
              pic: profile.picture || "",
              name: profile.name || "",
            },
          });
        }

        return true;
      }

      return true;
    },

    async jwt({ token, user, account, profile }) {
      // For credentials logins
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      // For Google logins (user is undefined)
      if (account?.provider === "google" && profile?.email) {
        token.email = profile.email;

        const dbUser = await prisma.user.findUnique({
          where: { email: profile.email },
          select: { id: true },
        });

        if (dbUser) {
          token.id = dbUser.id;
        }
      }

      return token;
    },

    async session({ session, token }) {
      //@ts-ignore
      if (token?.email) session.user.email = token.email;
      //@ts-ignore
      if (token?.id) session.user.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: "/",
    error: "/login",
  },
};

export default NextAuth(authOptions);
