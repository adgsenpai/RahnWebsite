import * as nodemailer from "nodemailer";
import { emailConfig } from "./config";

export default async function sendEmail(
  email: any,
  subject: any,
  htmlcode: any,
  message: any,
  attachments: any
) {
  try {
  const hostname = emailConfig.SMTP_SERVER;
  const username = emailConfig.SMTP_USERNAME;
  const password = emailConfig.SMTP_PASSWORD;
  const fromAddress = emailConfig.EMAIL_FROM;

    const transporter = nodemailer.createTransport({
      host: hostname,
      port: emailConfig.SMTP_PORT,
      secure: false,
      auth: {
        user: username,
        pass: password,
      },
    });

    // Send to the company inbox by default
    const toAddress = emailConfig.EMAIL_FROM;

    // Email-verbose: log send info
    const emailVerbose = false;

    if (emailVerbose) console.log(`Sending message from ${fromAddress} to ${toAddress}`);

    const info = await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      subject: subject,
      text: message,
      html: htmlcode,
      attachments: attachments,
    });
    
    console.log("Message sent:", info.response || info.messageId || "(no response)");
    return { success: true, message: "Email sent successfully." };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "An error occurred while sending the email.",
    };
  }
}
