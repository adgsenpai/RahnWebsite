import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminUser } from '../../../lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const user = getAdminUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  return res.status(200).json({ username: user });
}
