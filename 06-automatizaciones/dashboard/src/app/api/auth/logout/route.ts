import { NextRequest, NextResponse } from 'next/server';
import { SESSION_COOKIE_NAME } from '@/lib/session';

function clearAndRedirect(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/', request.url));
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
  return response;
}

export async function GET(request: NextRequest) {
  return clearAndRedirect(request);
}

export async function POST(request: NextRequest) {
  return clearAndRedirect(request);
}
