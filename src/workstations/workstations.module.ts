// src/workstations/workstations.module.ts
import { Module } from '@nestjs/common';
import { WorkstationsService } from './workstations.service';
import { WorkstationsController } from './workstations.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [WorkstationsController],
  providers: [WorkstationsService, PrismaService],
})
export class WorkstationsModule {}
