// src/notification/email-notification.service.ts
import { Injectable } from '@nestjs/common';
import { ServerClient } from 'postmark';

@Injectable()
export class EmailNotificationService {
  private readonly client: ServerClient;

  constructor() {
    this.client = new ServerClient('5aefe22c-333b-455d-82aa-4d35715c88ba');
  }

  async sendEmail(
    to: string,
    subject: string,
    htmlBody: string,
    textBody: string,
  ): Promise<void> {
    try {
      await this.client.sendEmail({
        From: 'donotreplay@gesprin.co.ao',
        To: to,
        Subject: subject,
        HtmlBody: htmlBody,
        TextBody: textBody,
        MessageStream: 'notificacoes-gesprin',
      });
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error(`Failed to send email to ${to}:`, error);
      throw new Error(`Failed to send email to ${to}`);
    }
  }
}
