// src/notifications/notifications.service.ts
import { Injectable, Logger } from '@nestjs/common';
import {
  NotificationPreference,
  Notification,
} from './entities/notification.interface';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendNotification(notification: Notification): Promise<void> {
    for (const preference of notification.preferences) {
      if (preference === NotificationPreference.EMAIL) {
        await this.sendEmail(notification);
      } else if (preference === NotificationPreference.SMS) {
        await this.sendSms(notification);
      }
    }
  }

  private async sendEmail(notification: Notification): Promise<void> {
    // Implementar a lógica para enviar email
    this.logger.log(
      `Sending email to ${notification.email}: ${notification.message}`,
    );
    // Coloque aqui a implementação concreta de envio de email
  }

  private async sendSms(notification: Notification): Promise<void> {
    // Implementar a lógica para enviar SMS
    this.logger.log(
      `Sending SMS to ${notification.phoneNumber}: ${notification.message}`,
    );
    // Coloque aqui a implementação concreta de envio de SMS
  }
}
