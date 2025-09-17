// pages/api/verify-captcha.ts

import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const { token } = req.body;
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      `secret=6LcWg9knAAAAAJr50Nd72cwOvqqgDU2vdQlPXXTD&response=${token}`
    );

    if (response.data.success) {
      res.json({ message: 'Captcha verification successful' });
    } else {
      res.status(400).json({ error: 'Captcha verification failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
