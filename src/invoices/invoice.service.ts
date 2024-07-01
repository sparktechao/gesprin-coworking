// src/invoices/invoices.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Invoice } from './entities/invoice.interface';
import { NotificationsService } from '../notifications/notifications.service';
import { PaymentReferenceGeneratorService } from '../payment-reference/payment-reference-generator.service';
import {
  Notification,
  NotificationPreference,
} from '../notifications/entities/notification.interface';
import { format, addMonths, parseISO, startOfMonth } from 'date-fns';
import { ContractStatus, InvoiceStatus } from '@prisma/client';
import { CreateSubscriptionInvoiceDto } from './dto/create-invoice.dto';
import { EmailNotificationService } from 'src/common/notifications/email.notification.service';
import { generateInvoiceEmailTemplate } from 'src/contracts/utils/notadepagamento.email.template.utils';
import { BaseGenericService } from '../common/services/base-generic-service';

@Injectable()
export class InvoicesService extends BaseGenericService<Invoice> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationsService: NotificationsService,
    private readonly paymentReferenceGeneratorService: PaymentReferenceGeneratorService,
    private readonly emailNotificationService: EmailNotificationService,
  ) {
    super(prismaService, 'invoice');
  }

  async createSubscriptionInvoice(
    createSubscriptionInvoiceDto: CreateSubscriptionInvoiceDto,
  ): Promise<Invoice> {
    const { contractId, numberOfMonths } = createSubscriptionInvoiceDto;

    const contract = await this.prismaService.contract.findUnique({
      where: { id: contractId },
      include: { contractValues: true, coworker: true },
    });

    if (!contract) {
      throw new BadRequestException('Contract not found');
    }

    if (contract.status !== ContractStatus.ACTIVE) {
      throw new BadRequestException(
        `Cannot create invoices on a ${contract.status} contract. Please contact the admin.`,
      );
    }

    const contractStartDate = startOfMonth(
      parseISO(contract.startDate.toISOString()),
    );

    const latestInvoice = await this.prismaService.invoice.findFirst({
      where: { contractId },
      orderBy: { issueDate: 'desc' },
    });

    let startMonth = contractStartDate;
    if (latestInvoice) {
      const latestCoveredMonth = latestInvoice.coveredMonths.sort().pop();
      startMonth = addMonths(new Date(`${latestCoveredMonth}-01`), 1);
    }

    const monthsToInvoice = [];
    for (let i = 0; i < numberOfMonths; i++) {
      const monthString = format(addMonths(startMonth, i), 'MMM-yy');
      monthsToInvoice.push(monthString);
    }

    const latestContractValue = contract.contractValues.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )[0];

    if (!latestContractValue) {
      throw new BadRequestException('No contract value found for the contract');
    }

    const amount = latestContractValue.amount * monthsToInvoice.length;

    const newInvoice = await this.prismaService.invoice.create({
      data: {
        contractId,
        issueDate: new Date(),
        amount,
        coveredMonths: monthsToInvoice,
        status: InvoiceStatus.UNPAID,
        reference: this.generateReference(), // Assuming a method to generate payment reference
      },
    });

    // Send notification email
    const coworkerEmail = contract.coworker.email;
    const coworkerName = contract.coworker.name;
    const htmlBody = generateInvoiceEmailTemplate(coworkerName, {
      contractId,
      issueDate: new Date(),
      amount,
      coveredMonths: monthsToInvoice,
      reference: newInvoice.reference,
      nuc: contract.nuc,
    });

    await this.emailNotificationService.sendEmail(
      coworkerEmail,
      'Nova Nota de Pagamento Gerada',
      htmlBody,
      `Prezado ${coworkerName}, uma nova fatura foi gerada para o seu contrato com ID: ${contractId}.`,
    );

    return newInvoice;
  }

  private generateReference(): string {
    // Implement your reference generation logic here
    return 'unique-reference';
  }

  async generateMonthlyInvoices(): Promise<void> {
    try {
      const contracts = await this.prismaService.contract.findMany({
        where: { status: 'ACTIVE' },
        include: { contractValues: true, coworker: true },
      });

      for (const contract of contracts) {
        try {
          const latestValue = contract.contractValues.reduce((prev, current) =>
            prev.createdAt > current.createdAt ? prev : current,
          );

          const reference =
            await this.paymentReferenceGeneratorService.generateReference();

          const invoice = await this.prismaService.invoice.create({
            data: {
              contractId: contract.id,
              issueDate: new Date(),
              amount: latestValue.amount,
              reference,
              status: 'UNPAID',
              coveredMonths: [],
            },
          });

          const notification: Notification = {
            phoneNumber: contract.coworker.phone,
            email: contract.coworker.email,
            name: contract.coworker.name,
            message: `Your invoice for ${invoice.amount} has been generated. Payment reference: ${reference}`,
            preferences: contract.coworker
              .notificationPreferences as NotificationPreference[],
          };

          await this.notificationsService.sendNotification(notification);
        } catch (contractError) {
          console.error(
            `Failed to process contract ID ${contract.id}:`,
            contractError,
          );
        }
      }
    } catch (error) {
      console.error('Failed to generate monthly invoices:', error);
    }
  }

  async applyLateFees(): Promise<void> {
    const overdueInvoices = await this.prismaService.invoice.findMany({
      where: {
        issueDate: {
          lt: new Date(new Date().setDate(10)),
        },
        payments: {
          none: {},
        },
      },
      include: { contract: { include: { coworker: true } } },
    });

    for (const invoice of overdueInvoices) {
      const lateFee = invoice.amount * 0.1;
      const newAmount = invoice.amount + lateFee;
      const reference =
        await this.paymentReferenceGeneratorService.generateReference();

      await this.prismaService.invoice.create({
        data: {
          contractId: invoice.contractId,
          issueDate: new Date(),
          amount: newAmount,
          reference,
          status: 'UNPAID',
          coveredMonths: [],
        },
      });

      // Optionally, mark the original invoice as overdue or archived
      await this.prismaService.invoice.update({
        where: { id: invoice.id },
        data: { status: 'OVERDUE' }, // You might need to add status field in the Invoice model
      });

      const notification: Notification = {
        phoneNumber: invoice.contract.coworker.phone,
        email: invoice.contract.coworker.email,
        name: invoice.contract.coworker.name,
        message: `Your overdue invoice has been updated with a late fee. New amount: ${newAmount}. Payment reference: ${reference}`,
        preferences: invoice.contract.coworker
          .notificationPreferences as NotificationPreference[],
      };

      await this.notificationsService.sendNotification(notification);
    }
  }
}
