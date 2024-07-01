// src/contracts/contracts.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractsController } from './contract.controller';
import { ContractsService } from './contract.service';
import { EmailNotificationService } from 'src/common/notifications/email.notification.service';
import { JwtService } from 'src/common/jwt/jwt.service';
import { SmsNotificationService } from 'src/common/notifications/sms-notification.service';
import { PdfService } from 'src/common/services/pdf.service';

@Module({
  controllers: [ContractsController],
  providers: [
    ContractsService,
    PrismaService,
    EmailNotificationService,
    JwtService,
    SmsNotificationService,
    PdfService,
  ],
})
export class ContractsModule {}
