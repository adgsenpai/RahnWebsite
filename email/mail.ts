import * as nodemailer from "nodemailer";
import { emailConfig } from "./config";

export default async function sendEmail(
  toEmail: string,   // user's email from form
  subject: string,
  message: string,
  phone: string      // ✅ phone number field
) {
  try {
  const hostname = emailConfig.SMTP_SERVER;
  const username = emailConfig.SMTP_USERNAME;
  const password = emailConfig.SMTP_PASSWORD;

    const transporter = nodemailer.createTransport({
      host: hostname,
      port: emailConfig.SMTP_PORT,
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
