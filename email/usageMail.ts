import sendEmail from "./attachmentMail";

console.log("Sending email...");

// send attachment
const attachments = [
    {
        filename: "test.txt",
        content: "This is a test attachment.",
    },
];

// Example usage:
// sendEmail("recipient@example.com", "Test email", "<h1>Test email</h1>", "This is a test email.", attachments)