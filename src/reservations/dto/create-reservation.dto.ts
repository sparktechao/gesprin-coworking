// src/reservations/dto/create-reservation.dto.ts
import { IsString, IsDate } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  roomId: string;

  @IsString()
  coworkerId: string;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
}
