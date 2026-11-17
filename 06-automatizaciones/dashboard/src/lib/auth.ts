import crypto from 'node:crypto';

const DEFAULT_ADMIN_EMAIL = 'sanchezdevian0110@gmail.com';
// scrypt salt:hash generated for initial admin password (never stored in plaintext)
const DEFAULT_ADMIN_PASSWORD_HASH =
  '7ebddb45defa4e943862b1920112664c:d912b0228133b1bfb76d318f4a4618913073d21dffe6698da8e1c9ff72435c6a560fe7811899c831b295e0a0408699f3d62d51d34b6f56545a94ac62318d0351';

interface AttemptRecord {
  count: number;
  resetAt: number;
}

const attemptStore = new Map<string, AttemptRecord>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec?: number } {
  const now = Date.now();
  const existing = attemptStore.get(ip);

  if (!existing || existing.resetAt <= now) {
    attemptStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (existing.count >= MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfterSec: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return { allowed: true };
}

export function resetRateLimit(ip: string): void {
  attemptStore.delete(ip);
}

function timingSafeStringEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');
  if (bufA.length !== bufB.length) {
    // Compare against dummy buffer to keep constant-time behavior
    crypto.timingSafeEqual(bufA, bufA);
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyAdminCredentials(emailInput: string, passwordInput: string): {
  valid: boolean;
  email: string;
  name: string;
} {
  const expectedEmail = (process.env.DASHBOARD_ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL)
    .trim()
    .toLowerCase();
  const normalizedInputEmail = emailInput.trim().toLowerCase();

  const emailMatches = timingSafeStringEqual(normalizedInputEmail, expectedEmail);

  const storedHash = process.env.DASHBOARD_ADMIN_PASSWORD_HASH || DEFAULT_ADMIN_PASSWORD_HASH;
  const [salt, keyHex] = storedHash.split(':');
  if (!salt || !keyHex) {
    return { valid: false, email: expectedEmail, name: 'Admin' };
  }

  const derivedKey = crypto.scryptSync(passwordInput, salt, 64);
  const expectedKey = Buffer.from(keyHex, 'hex');
  const passwordMatches =
    derivedKey.length === expectedKey.length &&
    crypto.timingSafeEqual(derivedKey, expectedKey);

  return {
    valid: emailMatches && passwordMatches,
    email: expectedEmail,
    name: 'Damian (Admin)',
  };
}
