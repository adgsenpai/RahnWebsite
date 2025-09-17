import Mail from "nodemailer/lib/mailer";
import sendEmail from "../../email/attachmentMail";

export default async function handler(req: { method: string; headers: { authorization: any; }; body: { email: any; subject: any; htmlcode: any; message: any; cv: any; filename: any }; }, res: { status: (arg0: number) => { (): any; new(): any; end: { (): any; new(): any; }; json: { (arg0: { error?: string; message?: string; }): void; new(): any; }; }; }) {
    const apiKey = "RahnWebsite";

    if (req.method !== 'POST') {
        return res.status(405).end(); // Method not allowed
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== `Bearer ${apiKey}`) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const { email, subject, htmlcode, message, cv, filename } = req.body;


    if (!email || !subject || !htmlcode || !message) {
        return res.status(400).json({ error: 'Missing required data' });

    }

    const cvFile = Buffer.from(cv, 'base64');

    const attachment = [
        {
            filename: filename,
            content: cvFile,
        }
    ]

    try {
        await sendEmail(email, subject, htmlcode, message, attachment);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while sending the email' });
    }
}
