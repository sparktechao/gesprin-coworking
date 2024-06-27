// src/invoices/invoices.tasks.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InvoicesService } from './invoice.service';

@Injectable()
export class InvoicesTasks {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async handleMonthlyInvoices() {
    await this.invoicesService.generateMonthlyInvoices();
  }

  @Cron('0 0 10 * *')
  async handleLateFees() {
    await this.invoicesService.applyLateFees();
  }
}
