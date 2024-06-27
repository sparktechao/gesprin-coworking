// src/workstations/dto/create-workstation.dto.ts
import { IsString } from 'class-validator';

export class CreateWorkstationDto {
  @IsString()
  roomId: string;

  @IsString()
  stationNumber: string;
}
