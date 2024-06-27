// src/prints/dto/update-print-job.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePrintJobDto } from './create-print-job.dto';

export class UpdatePrintJobDto extends PartialType(CreatePrintJobDto) {}
