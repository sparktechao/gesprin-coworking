// src/prints/prints.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseGenericService } from '../common/services/base-generic-service';
import { PrintJob } from './entities/print-job.interface';

@Injectable()
export class PrintsService extends BaseGenericService<PrintJob> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'printJob');
  }
}
