// src/prints/entities/print-job.interface.ts
export interface PrintJob {
  id: string;
  coworkerId: string;
  printDate: Date;
  pageCount: number;
}
