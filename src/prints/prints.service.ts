// src/prints/prints.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { PrintJob } from './entities/print-job.interface';
import { BaseGenericService } from '../common/services/base-generic-service';

@Injectable()
export class PrintsService extends BaseGenericService<PrintJob> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'printJob');
  }
}
