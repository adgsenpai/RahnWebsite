import type { NextApiRequest, NextApiResponse } from "next";
import sendEmail from "../../email/mail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = "RahnWebsite";

  if (req.method !== "POST") {
    return res.status(405).end(); // Method not allowed
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${apiKey}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // ✅ include phone
  const { email, subject, message, phone } = req.body;

  if (!email || !subject || !message || !phone) {
    return res.status(400).json({ error: "Missing required data" });
  }

  try {
    await sendEmail(email, subject, message, phone);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
}
