import { sendEmail } from '../../utils/email.ts';

interface EmailNotification {
  to: string;
  subject: string;
  body: string;
}

export class EmailService {
  async sendNotification(notification: EmailNotification): Promise<void> {
    const { to, subject, body } = notification;
    await sendEmail(to, subject, body);
  }
}

/**
 * Sends a password reset email to the user
 * @param email The recipient's email address
 * @returns Promise that resolves when email is sent
 */
export async function sendPasswordResetEmail(email: string): Promise<void> {
  const subject = "Password Reset Confirmation";
  const body = `
    <h1>Password Reset Successful</h1>
    <p>Your password has been successfully reset.</p>
    <p>If you did not request this change, please contact our support team immediately.</p>
    <p>Thank you for using our Library Management System.</p>
  `;
  
  const emailService = new EmailService();
  await emailService.sendNotification({
    to: email,
    subject,
    body
  });
}