// src/payments/entities/payment.entity.ts
import { Payment } from '@prisma/client';

export class PaymentEntity implements Payment {
  id: string;
  invoiceId: string;
  paymentDate: Date;
  amountPaid: number;

  constructor(partial: Partial<PaymentEntity>) {
    Object.assign(this, partial);
  }
}
