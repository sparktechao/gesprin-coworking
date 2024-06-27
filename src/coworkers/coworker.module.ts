// src/coworkers/coworkers.module.ts
import { Module } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CoworkersController } from './coworker.controller';
import { CoworkersService } from './coworker.service';

@Module({
  controllers: [CoworkersController],
  providers: [CoworkersService, PrismaService],
})
export class CoworkersModule {}
