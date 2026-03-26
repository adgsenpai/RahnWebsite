import type { NextApiRequest, NextApiResponse } from 'next';
import { createSessionToken, setSessionCookie } from '../../../lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const adminUsername = process.env.ADMIN_USERNAME || 'root123';
  const adminPassword = process.env.ADMIN_PASSWORD || 'toor123';

  if (username === adminUsername && password === adminPassword) {
    const token = createSessionToken(username);
    setSessionCookie(res, token);
    return res.status(200).json({ success: true, username });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
