// src/notifications/interfaces/notification.interface.ts
export interface Notification {
  phoneNumber: string;
  email: string;
  name: string;
  message: string;
  preferences: NotificationPreference[];
}

export enum NotificationPreference {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}
