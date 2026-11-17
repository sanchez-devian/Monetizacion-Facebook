import { Auth0Client } from '@auth0/nextjs-auth0/server';

export function isAuth0Configured(): boolean {
  return Boolean(
    process.env.AUTH0_DOMAIN &&
      process.env.AUTH0_CLIENT_ID &&
      process.env.AUTH0_CLIENT_SECRET &&
      process.env.AUTH0_SECRET
  );
}

let _auth0Client: Auth0Client | null = null;

export function getAuth0Client(): Auth0Client | null {
  if (!isAuth0Configured()) return null;
  if (!_auth0Client) {
    _auth0Client = new Auth0Client({
      domain: process.env.AUTH0_DOMAIN!,
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      secret: process.env.AUTH0_SECRET!,
      appBaseUrl: process.env.APP_BASE_URL,
      session: {
        rolling: true,
        absoluteDuration: 60 * 60 * 24 * 7, // 7 días de sesión persistente
        inactivityDuration: 60 * 60 * 24 * 3,
      },
    });
  }
  return _auth0Client;
}
