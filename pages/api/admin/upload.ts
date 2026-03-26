import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import path from 'path';
import { requireAdmin } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const extOk = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimeOk = allowedTypes.test(file.mimetype);
    if (extOk && mimeOk) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (jpeg, png, gif, webp, svg) are allowed'));
    }
  },
});

function runMiddleware(req: any, res: any, fn: any): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export const config = {
  api: { bodyParser: false },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!requireAdmin(req, res)) return;

  try {
    await runMiddleware(req, res, upload.single('image'));

    // @ts-ignore - multer adds file to req
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const mimeType = file.mimetype;
    const base64 = file.buffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64}`;

    await prisma.uploadedImage.create({
      data: {
        filename: file.originalname,
        dataUrl,
        mimeType,
      },
    });

    return res.json({ url: dataUrl, filename: file.originalname });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Upload failed' });
  }
}
