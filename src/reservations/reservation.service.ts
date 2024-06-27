// src/reservations/reservations.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseGenericService } from '../common/services/base-generic-service';
import { Reservation } from './entities/reservation.interface';

@Injectable()
export class ReservationsService extends BaseGenericService<Reservation> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'reservation');
  }
}
