import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export const SESSION_COOKIE_NAME = 'mf_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 días

export interface SessionPayload {
  email: string;
  name: string;
  role: 'admin';
}

function getSecretKey(): Uint8Array {
  const secret =
    process.env.SESSION_SECRET ||
    '0155bbc0a9c631f504b0908184b2daf6e616dd36716a136c0e4df34e131fb09c';
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE_SECONDS}s`)
    .sign(getSecretKey());
}

export async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ['HS256'],
    });
    if (typeof payload.email !== 'string' || typeof payload.name !== 'string') {
      return null;
    }
    return {
      email: payload.email,
      name: payload.name,
      role: 'admin',
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}

export function getSessionCookieOptions() {
  return {
    name: SESSION_COOKIE_NAME,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  };
}
