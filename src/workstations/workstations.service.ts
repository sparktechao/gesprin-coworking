// src/workstations/workstations.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseGenericService } from '../common/services/base-generic-service';
import { Workstation } from './entities/workstation.interface';

@Injectable()
export class WorkstationsService extends BaseGenericService<Workstation> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'workstation');
  }
}
