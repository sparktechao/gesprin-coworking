// src/payments/entities/payment.interface.ts
export interface Payment {
  id: string;
  invoiceId: string;
  paymentDate: Date;
  amountPaid: number;
}
