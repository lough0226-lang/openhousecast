import { NextRequest } from 'next/server';
import { handlers } from '@/lib/auth';

/**
 * Rebase the incoming request's URL onto the canonical public host.
 *
 * The custom Node server (and some proxies) builds `NextRequest.url` from the
 * local listen address (e.g. `https://localhost:5000`) while keeping the real
 * public host only in the `x-forwarded-host` / `host` headers. Auth.js derives
 * the provider sign-in and callback URLs from `request.url`, so those would
 * otherwise point at localhost. Prefer the forwarded host (the host the client
 * actually used), then fall back to `host`, and construct a new request whose
 * URL origin matches it. Requests that are already correct are returned as-is.
 */
function withCanonicalHost(req: NextRequest): NextRequest {
  const canonicalHost =
    req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  if (!canonicalHost) {
    return req;
  }
  let origin: string;
  try {
    origin = new URL(req.url).origin;
  } catch {
    return req;
  }
  const proto =
    req.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ?? 'https';
  const canonicalOrigin = `${proto}://${canonicalHost}`;
  if (canonicalOrigin === origin) {
    return req;
  }
  const normalizedURL = req.url.replace(origin, canonicalOrigin);
  return new NextRequest(normalizedURL, req);
}

export const GET = (req: NextRequest) =>
  handlers.GET(withCanonicalHost(req));

export const POST = (req: NextRequest) =>
  handlers.POST(withCanonicalHost(req));
