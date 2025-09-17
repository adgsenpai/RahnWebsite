// Your frontend component file

import axios from 'axios';

export async function verifyCaptcha(token: string | null) {
  try {
    const response = await axios.post('/api/verify-captcha', { token });
    return response.data.message;
  } catch (error) {
    throw new Error('Failed Captcha');
  }
}
