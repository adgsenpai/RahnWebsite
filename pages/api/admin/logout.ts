import type { NextApiRequest, NextApiResponse } from 'next';
import { clearSessionCookie } from '../../../lib/auth';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  clearSessionCookie(res);
  return res.status(200).json({ success: true });
}
