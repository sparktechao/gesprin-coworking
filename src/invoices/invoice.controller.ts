// src/invoices/invoices.controller.ts
import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { BaseGenericController } from '../common/controllers/base-generic-controller';
import { Invoice } from '@prisma/client';
import {
  CreateInvoiceDto,
  CreateSubscriptionInvoiceDto,
} from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { InvoicesService } from './invoice.service';

@Controller('invoices')
export class InvoicesController extends BaseGenericController<
  Invoice,
  CreateInvoiceDto,
  UpdateInvoiceDto
> {
  constructor(private readonly invoicesService: InvoicesService) {
    super(invoicesService);
  }
  @Post('subscription')
  async createSubscriptionInvoice(
    @Body() createSubscriptionInvoiceDto: CreateSubscriptionInvoiceDto,
  ): Promise<Invoice> {
    try {
      return await this.invoicesService.createSubscriptionInvoice(
        createSubscriptionInvoiceDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
