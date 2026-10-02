import NextAuth, { type NextAuthConfig } from 'next-auth';
import Nodemailer from 'next-auth/providers/nodemailer';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { googleProvider } from '@/lib/auth-google';

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
const providers: NextAuthConfig['providers'] = [googleProvider()];

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
  /**
   * Pin the cookie scheme to a single value instead of letting Auth.js infer
   * it from each request's URL protocol. The inferred value differs between:
   *   - OAuth callback/`signOut` routes (rewritten to https by withCanonicalHost)
   *   - server-side `auth()` in pages / route handlers (internal host, http)
   * That mismatch made the `__Secure-` cookie prefix inconsistent — a session
   * written with one prefix could not be read / cleared from contexts that
   * inferred the other, producing the "bounced back to login right after
   * signing in" and "still logged in after sign out" symptoms.
   * Production is always HTTPS; local dev is plain http.
   */
  useSecureCookies: process.env.COZE_PROJECT_ENV !== 'DEV',
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

// Never trust a platform-injected absolute AUTH_URL / NEXTAUTH_URL: a stale
// value (e.g. a dev preview domain) would make the sign-in, callback, and OAuth
// redirect URLs point at the wrong host. Remove them before initializing
// NextAuth so that, with `trustHost: true`, the canonical base URL is derived
// from the incoming request's `x-forwarded-host` / `host` header on every call.
delete process.env.AUTH_URL;
delete process.env.NEXTAUTH_URL;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
