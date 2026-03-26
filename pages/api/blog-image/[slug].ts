import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const slug = req.query.slug as string;
  if (!slug) return res.status(400).end();

  try {
    const blog = await prisma.blog.findUnique({
      where: { slug },
      select: { featuredImage: true },
    });

    if (!blog || !blog.featuredImage) {
      return res.status(404).end();
    }

    const dataUrl = blog.featuredImage;

    // If stored as base64 data URL, stream it as image
    if (dataUrl.startsWith('data:')) {
      const [meta, base64] = dataUrl.split(',');
      const mimeType = meta.split(':')[1].split(';')[0];
      const buf = Buffer.from(base64, 'base64');
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.send(buf);
    }

    // Otherwise redirect to the URL
    return res.redirect(302, dataUrl);
  } catch {
    return res.status(500).end();
  }
}
