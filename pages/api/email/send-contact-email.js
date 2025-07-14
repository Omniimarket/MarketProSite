// pages/api/email/send-contact-email.js
// This Next.js API route handles contact form submissions and sends emails using Nodemailer.

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests to this API route
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Extract form data from the request body
  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Log environment variables (for debugging ONLY, remove in production)
  // console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
  // console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
  // console.log('EMAIL_SECURE:', process.env.EMAIL_SECURE);
  // console.log('EMAIL_USER:', process.env.EMAIL_USER);
  // console.log('TO_EMAIL:', process.env.TO_EMAIL);
  // console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '********' : 'NOT SET'); // DO NOT log password directly!

  // Configure Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER, // This is support@marketproedge.com
      pass: process.env.EMAIL_PASS,
    },
    // Remove debug options for production, keep for troubleshooting
    // logger: true,
    // debug: true
  });

  try {
    // Verify connection configuration (optional, but good for debugging initial setup)
    await transporter.verify();
    console.log('Nodemailer transporter is ready to send messages');

    // Send the email
    await transporter.sendMail({
      from: `"${process.env.EMAIL_USER}" <${process.env.EMAIL_USER}>`, // <--- FIX: Send from your authenticated email
      to: process.env.TO_EMAIL,
      replyTo: `"${name}" <${email}>`, // <--- ADDED: When you reply, it goes to the user's email
      subject: `Contact Form: ${subject}`,
      html: `
        <p>You have a new message from your website contact form:</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br>
        <p>To reply, simply hit 'Reply' in your email client.</p>
      `,
    });

    // If email sent successfully
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    // Log the full error object for detailed debugging
    if (error.response) {
      console.error('Nodemailer response error:', error.response);
    }
    if (error.responseCode) {
      console.error('Nodemailer response code:', error.responseCode);
    }
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
}
