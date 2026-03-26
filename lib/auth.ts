import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';

const SECRET = process.env.ADMIN_SECRET || 'rahn-admin-secret-2024-change-me';
const COOKIE_NAME = 'admin_session';

export function createSessionToken(username: string): string {
  const timestamp = Date.now().toString();
  const data = `${username}:${timestamp}`;
  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(data)
    .digest('hex');
  return Buffer.from(`${data}:${signature}`).toString('base64');
}

export function verifySessionToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    const parts = decoded.split(':');
    if (parts.length !== 3) return null;
    const [username, timestamp, signature] = parts;
    const expected = crypto
      .createHmac('sha256', SECRET)
      .update(`${username}:${timestamp}`)
      .digest('hex');
    if (signature !== expected) return null;
    // Token expires after 24 hours
    if (Date.now() - parseInt(timestamp) > 24 * 60 * 60 * 1000) return null;
    return username;
  } catch {
    return null;
  }
}

export function getAdminUser(req: NextApiRequest): string | null {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) return null;
  return verifySessionToken(token);
}

export function setSessionCookie(res: NextApiResponse, token: string): void {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${24 * 60 * 60}`
  );
}

export function clearSessionCookie(res: NextApiResponse): void {
  res.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
  );
}

export function requireAdmin(
  req: NextApiRequest,
  res: NextApiResponse
): boolean {
  const user = getAdminUser(req);
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}
