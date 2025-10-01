import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
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

  ...authConfig,
});
