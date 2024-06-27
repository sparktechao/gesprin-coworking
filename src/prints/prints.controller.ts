// src/prints/prints.controller.ts
import { Controller } from '@nestjs/common';
import { BaseGenericController } from '../common/controllers/base-generic-controller';
import { PrintJob } from '@prisma/client';
import { CreatePrintJobDto } from './dto/create-print-job.dto';
import { UpdatePrintJobDto } from './dto/update-print-job.dto';
import { PrintsService } from './prints.service';

@Controller('prints')
export class PrintsController extends BaseGenericController<
  PrintJob,
  CreatePrintJobDto,
  UpdatePrintJobDto
> {
  constructor(private readonly printsService: PrintsService) {
    super(printsService);
  }
}
