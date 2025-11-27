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

  // Validate required SMTP environment variables early so UAT feedback is immediate
  const missing: string[] = [];
  if (!hostname) missing.push("EMAIL_HOST");
  if (!username) missing.push("EMAIL_USER");
  if (!password) missing.push("EMAIL_PASS");

  // EMAIL_FROM is preferred but we allow an explicit, opt-in fallback to EMAIL_USER
  // controlled by ALLOW_FROM_FALLBACK=true (this prevents accidental use of the
  // fallback unless you enable it in the environment).
  const allowFromFallback = process.env.ALLOW_FROM_FALLBACK === "true";
  if (!process.env.EMAIL_FROM && !allowFromFallback) missing.push("EMAIL_FROM");

  if (missing.length > 0) {
    const msg = `Missing required SMTP env var(s): ${missing.join(", ")}. Please set them before sending email (or use Mailtrap for UAT).`;
    console.error("sendEmail configuration error:", msg);
    // Fail fast — caller should handle the thrown error
    throw new Error(msg);
  }

    const transporter = nodemailer.createTransport({
      host: hostname,
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: username,
        pass: password,
      },
    });

    // Safety: by default the message is sent to EMAIL_FROM (company inbox).
    // For UAT/testing you can allow using the incoming 'email' argument as the
    // destination by setting ALLOW_TO_OVERRIDE=true in your environment. This
    // prevents accidental sending to arbitrary addresses unless explicitly enabled.
    const toAddress = process.env.ALLOW_TO_OVERRIDE === "true" && email ? email : process.env.EMAIL_FROM;

    // When EMAIL_FROM is missing but ALLOW_FROM_FALLBACK=true, use the SMTP user
    // address as the sender automatically (this is an opt-in safety feature).
    const fromAddress = process.env.EMAIL_FROM || (allowFromFallback ? username : undefined);

    if (!fromAddress) {
      const msg = "EMAIL_FROM missing and ALLOW_FROM_FALLBACK is not enabled. Aborting send.";
      console.error("sendEmail configuration error:", msg);
      throw new Error(msg);
    }

    // Email-verbose: when enabled the mailer will log richer send info (headers, ids)
    const emailVerbose = process.env.EMAIL_VERBOSE === "true";

    if (emailVerbose) console.log(`Sending message from ${fromAddress} to ${toAddress}`);

    const info = await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      subject: subject,
      text: message,
      html: htmlcode,
      attachments: attachments,
    });
    // Log the full info response for diagnostics when emailVerbose or in dev
    if (emailVerbose || process.env.NODE_ENV === "development") {
      console.log("Message send info:", info);
    } else {
      console.log("Message sent:", info.response || info.messageId || "(no response)");
    }
    return { success: true, message: "Email sent successfully." };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "An error occurred while sending the email.",
    };
  }
}
