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

  const id = parseInt(req.query.id as string);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'GET') {
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    return res.json(blog);
  }

  if (req.method === 'PUT') {
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

    try {
      const blog = await prisma.blog.update({
        where: { id },
        data: {
          title,
          slug,
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
      return res.json(blog);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Blog not found' });
      }
      if (error.code === 'P2002') {
        return res.status(409).json({ error: 'A blog with this slug already exists' });
      }
      throw error;
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.blog.delete({ where: { id } });
      return res.json({ success: true });
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: 'Blog not found' });
      }
      throw error;
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
