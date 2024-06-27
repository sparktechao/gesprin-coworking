// src/contract-values/contract-values.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractValuesController } from './contract-value.controller';
import { ContractValuesService } from './contract-value.service';

@Module({
  controllers: [ContractValuesController],
  providers: [ContractValuesService, PrismaService],
})
export class ContractValuesModule {}
