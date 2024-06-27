// src/prints/prints.module.ts
import { Module } from '@nestjs/common';
import { PrintsService } from './prints.service';
import { PrintsController } from './prints.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PrintsController],
  providers: [PrintsService, PrismaService],
})
export class PrintsModule {}
