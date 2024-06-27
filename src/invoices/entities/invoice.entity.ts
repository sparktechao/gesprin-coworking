// src/invoices/entities/invoice.entity.ts
import { Invoice } from './invoice.interface';

export class InvoiceEntity implements Invoice {
  id: string;
  contractId: string;
  issueDate: Date;
  amount: number;
  status: 'PAID' | 'UNPAID';
  reference: string;
  coveredMonths: string[];
  constructor(partial: Partial<InvoiceEntity>) {
    Object.assign(this, partial);
  }
}
