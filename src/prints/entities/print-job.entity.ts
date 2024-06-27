// src/prints/entities/print-job.entity.ts
import { PrintJob } from './print-job.interface';

export class PrintJobEntity implements PrintJob {
  id: string;
  coworkerId: string;
  printDate: Date;
  pageCount: number;

  constructor(partial: Partial<PrintJobEntity>) {
    Object.assign(this, partial);
  }
}
