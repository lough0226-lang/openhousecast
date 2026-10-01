import { NextRequest } from 'next/server';
import { handlers } from '@/lib/auth';

/**
 * Rebase the incoming request's URL onto the canonical public origin.
 *
 * The custom Node server (and some proxies) builds `NextRequest.url` from the
 * local listen address (e.g. `https://localhost:5000`) while keeping the real
 * public host only in the `x-forwarded-host` / `host` headers. Auth.js derives
 * the provider sign-in and callback URLs from `request.url`, so those would
 * otherwise point at localhost or use the wrong scheme.
 *
 * Host selection: prefer `x-forwarded-host` (the host the client actually
 * used), then fall back to `host`.
 *
 * Scheme selection:
 * 1. An explicit, non-empty `x-forwarded-proto` always wins.
 * 2. Otherwise, when the request arrived through a forwarded environment
 *    (present `x-forwarded-host`, or a non-local `host`), default to `https`.
 *    Some production gateways (Tengine/Envoy) terminate TLS but do not emit
 *    `x-forwarded-proto`, and Google OAuth requires an https callback.
 * 3. Only for local development (localhost / 127.0.0.1) do we keep plain
 *    http so the dev preview keeps working.
 */
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0', '[::1]']);

function firstHeaderValue(req: NextRequest, name: string): string | null {
  // Headers can carry a comma-separated list ("https,http"); take the first.
  const raw = req.headers.get(name);
  if (raw === null) return null;
  const value = raw.split(',')[0]?.trim().toLowerCase();
  return value ? value : null;
}

function withCanonicalHost(req: NextRequest): NextRequest {
  const forwardedHost = firstHeaderValue(req, 'x-forwarded-host');
  const host = firstHeaderValue(req, 'host');
  const canonicalHost = forwardedHost ?? host;
  if (!canonicalHost) {
    return req;
  }

  // Strip an optional :port / brackets when testing for locality.
  const hostname = canonicalHost.replace(/:\d+$/, '').replace(/^\[|\]$/g, '');
  const isLocal = LOCAL_HOSTS.has(hostname);

  // Coze's production gateway always terminates TLS behind an https origin.
  // Scheme resolution:
  //   1. An explicit `x-forwarded-proto: https` always wins (coverage for the
  //      case where the proxied host may otherwise look internal/local).
  //   2. Otherwise, any public (non-local) host is forced to https — Google
  //      OAuth rejects non-https callback URLs, and some gateways
  //      (Tengine/Envoy) omit `x-forwarded-proto` or emit `http` after
  //      terminating TLS, so we never trust a downgrade for a public origin.
  //   3. Only a local dev origin (localhost / loopback) with no https signal
  //      keeps plain http.
  const forwardedProto = firstHeaderValue(req, 'x-forwarded-proto');
  const scheme =
    forwardedProto === 'https' || !isLocal ? 'https' : 'http';

  let origin: string;
  try {
    origin = new URL(req.url).origin;
  } catch {
    return req;
  }

  const canonicalOrigin = `${scheme}://${canonicalHost}`;
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
