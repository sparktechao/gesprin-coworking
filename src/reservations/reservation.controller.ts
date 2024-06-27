// src/reservations/reservations.controller.ts
import { Controller } from '@nestjs/common';
import { BaseGenericController } from '../common/controllers/base-generic-controller';
import { Reservation } from '@prisma/client';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsService } from './reservation.service';

@Controller('reservations')
export class ReservationsController extends BaseGenericController<
  Reservation,
  CreateReservationDto,
  UpdateReservationDto
> {
  constructor(private readonly reservationsService: ReservationsService) {
    super(reservationsService);
  }
}
