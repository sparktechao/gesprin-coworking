// src/coworkers/coworkers.controller.ts
import { Controller } from '@nestjs/common';
import { BaseGenericController } from '../common/controllers/base-generic-controller';
import { Coworker } from './entities/coworker.interface';
import {
  CreateCoworkerDto,
  UpdateCoworkerDto,
} from './dto/create-coworker.dto';
import { CoworkersService } from './coworker.service';

@Controller('coworkers')
export class CoworkersController extends BaseGenericController<
  Coworker,
  CreateCoworkerDto,
  UpdateCoworkerDto
> {
  constructor(private readonly coworkersService: CoworkersService) {
    super(coworkersService);
  }
}
