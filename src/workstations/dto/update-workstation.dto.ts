// src/workstations/dto/update-workstation.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkstationDto } from './create-workstation.dto';

export class UpdateWorkstationDto extends PartialType(CreateWorkstationDto) {}
