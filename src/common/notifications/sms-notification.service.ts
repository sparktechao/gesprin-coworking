// src/notification/sms-notification.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SmsNotificationService {
  private readonly apiUrl = 'http://52.30.114.86:8080/mimosms/v1/message/send';
  private readonly apiKey = 'ddd8a5402097b1899d0b9d104537a197926454433';
  private readonly sender = 'Gesprin';

  async sendSms(phone: string, text: string): Promise<any> {
    try {
      const response = await axios.post(`${this.apiUrl}?token=${this.apiKey}`, {
        sender: this.sender,
        recipients: phone,
        text: text,
      });

      return response.data;
    } catch (error) {
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }
}
