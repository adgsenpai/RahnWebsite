import sendEmail from "./mail";

console.log("Sending email...");

// send attachment
const attachments = [
    {
        filename: "test.txt",
        content: "This is a test attachment.",
    },
];


//sendEmail("ashlin@rahn.co.za", "Test email", "<h1>Test email</h1>", "This is a test email.", attachments)