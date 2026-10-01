import NextAuth, { type NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Nodemailer from 'next-auth/providers/nodemailer';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';

/**
 * NextAuth (Auth.js v5) configuration for OpenHouseCast.
 *
 * - Persistent database sessions (users / accounts / sessions rows).
 * - Google OAuth as the primary provider.
 * - Email magic-link is enabled only when SMTP credentials are present
 *   (EMAIL_SERVER / EMAIL_FROM); it is always Fair-Housing-neutral.
 * - Auth tables live in the Prisma `app` schema. The generated Prisma
 *   client is already multi-schema aware, so PrismaAdapter needs no change.
 */
const providers: NextAuthConfig['providers'] = [
  Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
  }),
];

if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
  providers.push(
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      name: 'Email',
    }),
  );
}

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  providers,
  // Derive the canonical host from the incoming request so OAuth callback
  // URLs match the public domain behind the proxy.
  trustHost: true,
  // Persistent sessions stored in the database.
  session: { strategy: 'database' },
  pages: {
    signIn: '/auth/login',
    verifyRequest: '/auth/login',
    error: '/auth/login',
  },
  callbacks: {
    // With the database strategy the jwt callback is rarely invoked, but we
    // attach the user id here as well so it is present whenever it is.
    jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    // Make the database user id available on every session object.
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
