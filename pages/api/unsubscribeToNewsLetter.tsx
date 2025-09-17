import { PrismaClient } from '@prisma/client'
// EXAMPLE USAGE http://localhost:3000/api/unsubscribeToNewsLetter?email=adg@adgstudios.co.za


// check if prisma instance exists
declare global {
    var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient()
async function unsubscribeToNewsLetter(email: string) {
    // check if email exists
    const emailExists = await prisma.emailSubscriptions.findUnique({
        where: {
            email: email
        }
    })

    if (!emailExists) {
        return ({ error: 'Email does not exist' });
    }

    const result = await prisma.emailSubscriptions.delete({
        where: {
            email: email
        }
    })
    return result
}

export default async function handler(req: { method: string; query: { email?: string; }; }, res: { status: (arg0: number) => { (): any; new(): any; end: { (): any; new(): any; }; json: { (arg0: { error?: string; message?: string; }): void; new(): any; }; }; }) {
    if (req.method !== 'GET') {
        console.log("Method not allowed");
        return res.status(405).end(); // Method not allowed
    }

    const { email } = req.query;
    console.log(email);

    if (!email) {
        console.log("Missing required data");
        return res.status(400).json({ error: 'Missing required data' });
    }

    try {
        console.log(await unsubscribeToNewsLetter(email));        
        res.status(200).json({ message: 'Email unsubscribed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while unsubscribing the email' });
    }
}