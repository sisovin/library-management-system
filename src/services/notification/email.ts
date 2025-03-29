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
