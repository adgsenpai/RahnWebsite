import sendEmail from "./mail";
import sendEmailWithAttachment from "./attachmentMail";

async function runTests() {
  console.log("🧪 Testing Email System...\n");

  // Test 1: Simple contact form email
  console.log("Test 1: Sending simple contact email...");
  const result1 = await sendEmail(
    "adg@adgstudios.co.za",
    "UAT Test - Contact Form",
    "This is a UAT test message from the Rahn website contact form.",
    "+27123456789"
  );
  console.log("Result:", result1);
  console.log("---\n");

  // Test 2: Email with attachment
  console.log("Test 2: Sending email with attachment...");
  const attachment = [{
    filename: "test-document.txt",
    content: "This is a test attachment created during UAT testing on " + new Date().toISOString(),
  }];
  
  const result2 = await sendEmailWithAttachment(
    "adg@adgstudios.co.za",
    "UAT Test - Email with Attachment",
    "<h1>Test Email with Attachment</h1><p>This is a <strong>UAT test</strong> with an attachment.</p>",
    "This is the plain text version of the test email.",
    attachment
  );
  console.log("Result:", result2);
  console.log("---\n");

  console.log("✅ UAT Testing Complete!");
}

runTests().catch(console.error);
