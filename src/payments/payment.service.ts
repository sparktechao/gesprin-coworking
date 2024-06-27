// src/payments/payments.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseGenericService } from '../common/services/base-generic-service';
import { Payment, InvoiceStatus } from '@prisma/client';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService extends BaseGenericService<Payment> {
  constructor(private readonly prismaService: PrismaService) {
    super(prismaService, 'payment');
  }

  async createPayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { invoiceId, amountPaid } = createPaymentDto;

    if (amountPaid <= 0) {
      throw new BadRequestException('Payment amount must be greater than zero');
    }

    const invoice = await this.prismaService.invoice.findUnique({
      where: { id: invoiceId },
      include: { payments: true },
    });

    if (!invoice) {
      throw new BadRequestException('Invoice not found');
    }

    const totalPaid =
      invoice.payments.reduce((sum, payment) => sum + payment.amountPaid, 0) +
      amountPaid;

    if (totalPaid > invoice.amount) {
      throw new BadRequestException('Total payment exceeds invoice amount');
    }

    const newPayment = await this.prismaService.payment.create({
      data: {
        invoiceId,
        paymentDate: new Date(),
        amountPaid,
      },
    });

    if (totalPaid === invoice.amount) {
      await this.prismaService.invoice.update({
        where: { id: invoiceId },
        data: { status: InvoiceStatus.PAID },
      });
    }

    return newPayment;
  }
}
