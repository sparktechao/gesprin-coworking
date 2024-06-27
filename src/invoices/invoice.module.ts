// src/invoices/invoices.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InvoicesController } from './invoice.controller';
import { InvoicesService } from './invoice.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PaymentReferenceGeneratorService } from 'src/payment-reference/payment-reference-generator.service';
import { EmailNotificationService } from 'src/common/notifications/email.notification.service';

@Module({
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    PrismaService,
    NotificationsService,
    PaymentReferenceGeneratorService,
    EmailNotificationService,
  ],
})
export class InvoicesModule {}
