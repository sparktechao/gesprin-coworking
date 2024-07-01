// src/coworkers/coworkers.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Coworker } from './entities/coworker.interface';
import { BaseGenericService } from '../common/services/base-generic-service';

@Injectable()
export class CoworkersService extends BaseGenericService<Coworker> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'coworker');
  }
}
