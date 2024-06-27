// src/coworkers/entities/coworker.interface.ts

import { NotificationPreference } from '@prisma/client';

export interface Coworker {
  id: string;
  name: string;
  email: string;
  phone: string;
  nif: string;
  commercialCertificate: string;
  notificationPreferences: NotificationPreference[];
}
