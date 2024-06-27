// src/payments/payments.controller.ts
import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { BaseGenericController } from '../common/controllers/base-generic-controller';
import { Payment } from '@prisma/client';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentsService } from './payment.service';

@Controller('payments')
export class PaymentsController extends BaseGenericController<
  Payment,
  CreatePaymentDto,
  any
> {
  constructor(private readonly paymentsService: PaymentsService) {
    super(paymentsService);
  }

  @ApiOperation({ summary: 'Create a new payment' })
  @ApiResponse({ status: 201, description: 'The created payment.' })
  @Post('/create')
  @UsePipes(new ValidationPipe())
  async createPayment(
    @Body() createPaymentDto: CreatePaymentDto,
  ): Promise<Payment> {
    try {
      return await this.paymentsService.createPayment(createPaymentDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
