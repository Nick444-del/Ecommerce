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

        const data = `<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #4CAF50;">📥 New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${contact.name}</p>
        <p><strong>Email:</strong> ${contact.email}</p>
        <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
        <p><strong>Comment:</strong></p>
        <p style="background: #f9f9f9; padding: 10px; border-left: 3px solid #4CAF50;">${contact.comment}</p>
        <br>
        <p>Best regards,<br><strong>Bookwormdenn Team</strong></p>
        </div>`
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'nikhilneelam1869@gmail.com',
            subject: `New Contact Form Submission from ${contact.name}`,
            html: data
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send message', error: error.message });
    }
};

export const postPaymentSuccessMail = async (req, res) => {
    try {
        const email = req.user.user.email

        const { response } = req.body

        if (!email) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Email is required"
            });
        }

        if (!response || !response.razorpay_payment_id || !response.razorpay_order_id) {
            return res.status(400).json({
                success: false,
                data: null,
                error: "Invalid payment response data",
            });
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const emailBody = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">Payment Successful!</h2>
                <p>Dear User,</p>
                <p>We are pleased to inform you that your payment was successful. Below are the details of your transaction:</p>
                <ul>
                    <li><strong>Payment ID:</strong> ${response.razorpay_payment_id}</li>
                    <li><strong>Order ID:</strong> ${response.razorpay_order_id}</li>
                    <li><strong>Signature:</strong> ${response.razorpay_signature}</li>
                </ul>
                <p>Thank you for your purchase!</p>
                <p>If you have any questions, feel free to contact our support team.</p>
                <br>
                <p>Best regards,<br><strong>Bookwormdenn</strong></p>
            </div>
        `;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Payment Success`,
            html: emailBody
        })

        return res.status(200).json({
            success: true,
            error: false,
            message: "Email sent successfully"
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            data: null,
            error: error.message
        })
    }
}