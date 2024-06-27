// src/coworkers/entities/coworker.entity.ts

import { NotificationPreference } from '@prisma/client';
import { Coworker } from './coworker.interface';

export class CoworkerEntity implements Coworker {
  id: string;
  name: string;
  email: string;
  phone: string;
  nif: string;
  commercialCertificate: string;
  notificationPreferences: NotificationPreference[];

  constructor(partial: Partial<CoworkerEntity>) {
    Object.assign(this, partial);
  }
}
