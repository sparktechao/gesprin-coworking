// src/workstations/workstations.controller.ts
import { Controller } from '@nestjs/common';
import { BaseGenericController } from '../common/controllers/base-generic-controller';
import { WorkstationsService } from './workstations.service';
import { Workstation } from './entities/workstation.interface';
import { CreateWorkstationDto } from './dto/create-workstation.dto';
import { UpdateWorkstationDto } from './dto/update-workstation.dto';

@Controller('workstations')
export class WorkstationsController extends BaseGenericController<
  Workstation,
  CreateWorkstationDto,
  UpdateWorkstationDto
> {
  constructor(private readonly workstationsService: WorkstationsService) {
    super(workstationsService);
  }
}
