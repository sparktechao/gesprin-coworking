// src/prints/dto/create-print-job.dto.ts
import { IsString, IsDate, IsInt } from 'class-validator';

export class CreatePrintJobDto {
  @IsString()
  coworkerId: string;

  @IsDate()
  printDate: Date;

  @IsInt()
  pageCount: number;
}
