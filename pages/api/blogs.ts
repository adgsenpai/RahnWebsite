import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const blogs = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      author: true,
      metaKeywords: true,
      createdAt: true,
    },
  });

  // Replace base64 data URLs with the image API endpoint to keep response small
  const result = blogs.map((b) => ({
    ...b,
    featuredImage: b.featuredImage
      ? b.featuredImage.startsWith('data:')
        ? `/api/blog-image/${b.slug}`
        : b.featuredImage
      : null,
  }));

  return res.json(result);
}
