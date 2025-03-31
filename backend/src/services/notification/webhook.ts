import { sendWebhook } from '../../utils/webhook.ts';

interface WebhookNotification {
  url: string;
  payload: Record<string, unknown>;
}

export class WebhookService {
  async sendNotification(notification: WebhookNotification): Promise<void> {
    const { url, payload } = notification;
    await sendWebhook(url, payload);
  }
}
