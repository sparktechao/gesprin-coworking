// src/reservations/entities/reservation.interface.ts
export interface Reservation {
  id: string;
  roomId: string;
  coworkerId: string;
  startTime: Date;
  endTime: Date;
}
