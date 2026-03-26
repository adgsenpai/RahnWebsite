import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../lib/prisma';
import { requireAdmin } from '../../../../lib/auth';

export const config = {
  api: { bodyParser: { sizeLimit: '20mb' } },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!requireAdmin(req, res)) return;

  if (req.method === 'GET') {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(blogs);
  }

  if (req.method === 'POST') {
    const {
      title,
      slug,
      content,
      excerpt,
      featuredImage,
      author,
      published,
      ogTitle,
      ogDescription,
      ogImage,
      metaKeywords,
      metaDescription,
    } = req.body;

    if (!title || !slug || !content) {
      return res
        .status(400)
        .json({ error: 'Title, slug, and content are required' });
    }

    // Sanitize slug
    const cleanSlug = slug
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    try {
      const blog = await prisma.blog.create({
        data: {
          title,
          slug: cleanSlug,
          content,
          excerpt: excerpt || null,
          featuredImage: featuredImage || null,
          author: author || 'RAHN Team',
          published: !!published,
          ogTitle: ogTitle || null,
          ogDescription: ogDescription || null,
          ogImage: ogImage || null,
          metaKeywords: metaKeywords || null,
          metaDescription: metaDescription || null,
        },
      });
      return res.status(201).json(blog);
    } catch (error: any) {
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'A blog with this slug already exists' });
      }
      throw error;
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
