import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/api/auth/signin",
    error: "/api/auth/error",
  },
  callbacks: {
    signIn: async ({ user }) => {
      if (user.email && !user.email.endsWith("usfca.edu")) {
        return false;
      }
      return true;
    },
    session: async ({ session, user }) => {
      let isAdmin = false;
      if (session.user?.email) {
        const adminEmail = await db.adminEmail.findUnique({
          where: { email: session.user.email },
        });
        isAdmin = adminEmail !== null;
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
          isAdmin,
        },
      };
    },
  },
} satisfies NextAuthConfig;
