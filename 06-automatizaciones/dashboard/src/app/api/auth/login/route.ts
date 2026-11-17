import { NextRequest, NextResponse } from 'next/server';
import {
  checkRateLimit,
  resetRateLimit,
  verifyAdminCredentials,
} from '@/lib/auth';
import {
  createSessionToken,
  getSessionCookieOptions,
  SESSION_COOKIE_NAME,
} from '@/lib/session';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        error: `Demasiados intentos. Intenta de nuevo en ${rate.retryAfterSec} segundos.`,
      },
      {
        status: 429,
        headers: { 'Retry-After': String(rate.retryAfterSec || 900) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
  }

  const email =
    typeof (body as Record<string, unknown>)?.email === 'string'
      ? ((body as Record<string, unknown>).email as string)
      : '';
  const password =
    typeof (body as Record<string, unknown>)?.password === 'string'
      ? ((body as Record<string, unknown>).password as string)
      : '';

  if (!email || !password || email.length > 200 || password.length > 200) {
    return NextResponse.json({ error: 'Credenciales inválidas.' }, { status: 401 });
  }

  const result = verifyAdminCredentials(email, password);
  if (!result.valid) {
    return NextResponse.json({ error: 'Credenciales inválidas.' }, { status: 401 });
  }

  resetRateLimit(ip);

  const token = await createSessionToken({
    email: result.email,
    name: result.name,
    role: 'admin',
  });

  const response = NextResponse.json({ ok: true });
  const cookieOpts = getSessionCookieOptions();
  response.cookies.set(SESSION_COOKIE_NAME, token, cookieOpts);
  return response;
}
