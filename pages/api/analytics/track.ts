import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// Cast to access PageView model (types update after prisma generate)
const db = prisma as any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { path } = req.body;
    if (!path || typeof path !== 'string') {
      return res.status(400).json({ error: 'path is required' });
    }

    // Extract IP from headers (works behind proxies / Vercel / nginx)
    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      (typeof forwarded === 'string' ? forwarded.split(',')[0].trim() : forwarded?.[0]) ||
      req.socket.remoteAddress ||
      'unknown';

    const userAgent = (req.headers['user-agent'] || '').substring(0, 1000);
    const referer = (req.headers['referer'] || '').substring(0, 1000);

    // Geo-lookup using free ip-api.com (no key needed, 45 req/min)
    let country: string | null = null;
    let city: string | null = null;

    try {
      if (ip && ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1') {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=country,city`, {
          signal: AbortSignal.timeout(2000),
        });
        if (geoRes.ok) {
          const geo = await geoRes.json();
          country = geo.country || null;
          city = geo.city || null;
        }
      }
    } catch {
      // Geo lookup is best-effort, don't block tracking
    }

    await db.pageView.create({
      data: { path, ip, country, city, userAgent, referer },
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('Track error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
