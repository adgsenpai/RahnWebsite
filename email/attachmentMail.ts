import * as nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export default async function sendEmail(
  email: any,
  subject: any,
  htmlcode: any,
  message: any,
  attachments: any
) {
  try {
  const hostname = process.env.EMAIL_HOST;
  const username = process.env.EMAIL_USER;
  const password = process.env.EMAIL_PASS;

    const transporter = nodemailer.createTransport({
      host: hostname,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: username,
        pass: password,
      },
    });

    const info = await transporter.sendMail({
  from: process.env.EMAIL_FROM,
  to: process.env.EMAIL_FROM,
      subject: subject,
      text: message,
      html: htmlcode,
      attachments: attachments,
    });

    console.log("Message sent:", info.response);
    return { success: true, message: "Email sent successfully." };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "An error occurred while sending the email.",
    };
  }
}
