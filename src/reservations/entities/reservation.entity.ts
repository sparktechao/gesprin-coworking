// src/reservations/entities/reservation.entity.ts
import { Reservation } from './reservation.interface';

export class ReservationEntity implements Reservation {
  id: string;
  roomId: string;
  coworkerId: string;
  startTime: Date;
  endTime: Date;

  constructor(partial: Partial<ReservationEntity>) {
    Object.assign(this, partial);
  }
}
