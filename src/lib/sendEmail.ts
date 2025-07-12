import nodemailer from "nodemailer";
import { success } from "zod";

let transporter = nodemailer.createTransport({
    service: 'gmail', // or your preferred service
    auth: {
        user: 'martianmoon268@gmail.com', // your email address
        pass: process.env.GMAIL_SECRET   // your email password or app password
    }
});

type sendEmailProps = {
    otp: number,
    email: string
}

export default async function sendEmail({ otp, email }: sendEmailProps) {

    let mailOptions = {
        from: 'martianmoon268@gmail.com', // Sender address
        to: email,  // List of recipients
        subject: 'Hello from Packitup', // Subject line
        text: `Here is you otp:\n<h1>Email: ${email}OTP: </h1>\n<h2>${otp}</h2>`, // Plain text body
        // html: '<p>This is a test email sent using Nodemailer.</p>' // You can also use HTML for the body
    };

    try {
        const info = await transporter.sendMail(mailOptions);

        if(!info) {
            return { 
                success: false,
                message:"sending email failed "
            }
        }

        console.log('Message sent: %s', info?.messageId);

        return { 
            success: false,
            message:"sending email succeeded ",
            messageId :info?.messageId
        }
    } catch (error) {
        console.log(`Error Occured while sending email :: sendEmail :: ${error}`)

    }
}