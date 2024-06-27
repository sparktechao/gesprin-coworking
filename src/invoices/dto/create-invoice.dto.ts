// src/invoices/dto/create-invoice.dto.ts
import {
  IsString,
  IsDate,
  IsNumber,
  IsUUID,
  IsInt,
  Min,
} from 'class-validator';

export class CreateInvoiceDto {
  @IsString()
  contractId: string;

  @IsDate()
  issueDate: Date;

  @IsNumber()
  amount: number;

  @IsString()
  reference: string;
}

export class CreateSubscriptionInvoiceDto {
  @IsUUID()
  contractId: string;

  @IsInt()
  @Min(1)
  numberOfMonths: number; // Number of months to be covered by the invoice
}
