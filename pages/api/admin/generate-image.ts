import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAdmin } from '../../../lib/auth';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!requireAdmin(req, res)) return;

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: `Generate an image for: ${prompt}` }],
            },
          ],
          generationConfig: {
            responseModalities: ['IMAGE', 'TEXT'],
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res
        .status(500)
        .json({ error: data.error.message || 'Gemini API error' });
    }

    // Extract image data from response
    const candidates = data.candidates || [];
    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData) {
          const { mimeType, data: base64Data } = part.inlineData;
          const ext = mimeType.split('/')[1] || 'png';
          const filename = `ai-${Date.now()}.${ext}`;
          const dataUrl = `data:${mimeType};base64,${base64Data}`;

          await prisma.uploadedImage.create({
            data: { filename, dataUrl, mimeType },
          });

          return res.json({ url: dataUrl, filename });
        }
      }
    }

    return res
      .status(500)
      .json({ error: 'No image was generated. Try a different prompt.' });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || 'Failed to generate image' });
  }
}
