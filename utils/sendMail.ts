import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const createTransporter = async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail email address
      pass: process.env.SMTP_PASSWORD, // Your App-Specific Password
    },
  });

  return transporter;
};
export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const transporter = await createTransporter();

  const mailOptions = {
    from: `Your Name <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
