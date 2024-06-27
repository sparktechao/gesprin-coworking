// src/payments/dto/create-payment.dto.ts
import { IsNumber, IsNotEmpty, IsPositive, IsUUID } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  @IsNotEmpty()
  invoiceId: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amountPaid: number;
}
