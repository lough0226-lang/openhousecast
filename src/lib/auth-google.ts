import Google from 'next-auth/providers/google';
import { customFetch } from '@auth/core';
import { ProxyAgent } from 'undici';

/**
 * Outbound proxy for requests that must reach Google's OAuth endpoints
 * (`accounts.google.com`, `oauth2.googleapis.com`, ...).
 *
 * In some hosting regions (e.g. the cn-beijing Bytefaas runtime) the server
 * has no direct route to Google; without an explicit egress proxy those calls
 * fail with `UND_ERR_CONNECT_TIMEOUT` and Auth.js surfaces a generic
 * `Configuration` sign-in error. When a proxy is configured we route Google
 * traffic through it; otherwise we use the global fetch unchanged, so local
 * development and regions with direct egress are unaffected.
 */
const proxyUrl =
  process.env.HTTPS_PROXY ??
  process.env.https_proxy ??
  process.env.GOOGLE_OAUTH_PROXY ??
  '';

const proxyDispatcher = proxyUrl ? new ProxyAgent(proxyUrl) : null;

type FetchInput = Parameters<typeof fetch>[0];
type FetchInit = Parameters<typeof fetch>[1];

async function proxiedFetch(
  input: FetchInput,
  init?: FetchInit,
): Promise<Response> {
  if (!proxyDispatcher) {
    return fetch(input, init);
  }
  // `dispatcher` is honoured by the Node.js (undici-based) global fetch and
  // ProxyAgent establishes an HTTP CONNECT tunnel to the HTTPS target.
  return fetch(input, {
    ...(init ?? {}),
    dispatcher: proxyDispatcher,
  } as FetchInit);
}

/**
 * Google provider configured with a proxy-aware custom fetch. All other
 * behavior (client id/secret, OIDC discovery, email linking) is unchanged.
 */
export function googleProvider() {
  return Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
    [customFetch]: proxiedFetch,
  });
}
