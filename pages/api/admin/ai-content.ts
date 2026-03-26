import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAdmin } from '../../../lib/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!requireAdmin(req, res)) return;

  const { type, input } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Gemini API key not configured' });
  }

  if (!type || !input) {
    return res.status(400).json({ error: 'Type and input are required' });
  }

  let prompt = '';
  switch (type) {
    case 'seo':
      prompt = `Generate SEO metadata for a blog post titled "${input}". Return a JSON object with these exact keys: metaDescription (max 160 chars), metaKeywords (comma-separated), ogTitle, ogDescription. Only return valid JSON, no markdown formatting, no code blocks.`;
      break;
    case 'excerpt':
      prompt = `Write a compelling excerpt (max 200 words) for a blog post with this content: ${input.substring(0, 2000)}. Return only the excerpt text, no quotes or formatting.`;
      break;
    case 'outline':
      prompt = `Create a blog post with HTML formatting for the topic: "${input}". Include headings (h2, h3), paragraphs, and bullet points or ordered lists where appropriate. Return only the HTML content, no markdown, no code blocks.`;
      break;
    default:
      return res
        .status(400)
        .json({ error: 'Invalid type. Use: seo, excerpt, or outline' });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    return res.json({ result: text });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: error.message || 'AI generation failed' });
  }
}
