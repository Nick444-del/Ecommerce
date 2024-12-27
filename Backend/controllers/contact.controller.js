import nodemailer from 'nodemailer';
import Contact from '../models/contact.model.js';

export const sendContactEmail = async (req, res) => {
    const { name, email, phone, comment } = req.body;

    if (!name || !email || !comment) {
        return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const contact = new Contact(name, email, phone, comment);

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'nikhilneelam1869@gmail.com',
            subject: `New Contact Form Submission from ${contact.name}`,
            text: `
                Name: ${contact.name}
                Email: ${contact.email}
                Phone: ${contact.phone}
                Comment: ${contact.comment}
            `,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
};
