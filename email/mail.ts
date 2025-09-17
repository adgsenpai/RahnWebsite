import * as nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export default async function sendEmail(
  toEmail: string,   // user's email from form
  subject: string,
  message: string,
  phone: string      // ✅ phone number field
) {
  try {
  const hostname = process.env.EMAIL_HOST;
  const username = process.env.EMAIL_USER; // your Office365 account
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
  from: `Rahn Consolidated <${username}>`, // Always from your domain
      to: toEmail,                             // ✅ send directly to the user
      bcc: username,                           // ✅ blind copy to company inbox
      replyTo: toEmail,                        // reply goes to the user
      subject: subject,
      text: `
From: ${toEmail}
Phone: ${phone}

Message:
${message}
      `,
      html: `
        <p><strong>From:</strong> ${toEmail}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
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
