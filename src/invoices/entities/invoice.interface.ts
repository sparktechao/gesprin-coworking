// src/invoices/entities/invoice.interface.ts
export interface Invoice {
  id: string;
  contractId: string;
  issueDate: Date;
  amount: number;
  status: 'PAID' | 'UNPAID' | 'OVERDUE' | 'CANCELED';
  reference: string;
  coveredMonths: string[];
}
