// src/common/controllers/base-generic-controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BaseGenericService } from '../services/base-generic-service';

@Controller()
export class BaseGenericController<T, CreateDto, UpdateDto> {
  constructor(private readonly service: BaseGenericService<T>) {}

  @Get()
  async findAll(): Promise<T[]> {
    return this.service.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number | string): Promise<T | null> {
    if (typeof id === 'string') {
      return this.service.findOne({ where: { id } });
    }
    return this.service.findOne({ where: { id: Number(id) } });
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createDto: CreateDto): Promise<T> {
    return this.service.create({ data: createDto });
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: number | string,
    @Body() updateDto: UpdateDto,
  ): Promise<T> {
    if (typeof id === 'string') {
      return this.service.update({ where: { id }, data: updateDto });
    }
    return this.service.update({ where: { id: Number(id) }, data: updateDto });
  }

  @Delete(':id')
  async delete(@Param('id') id: number | string): Promise<T> {
    if (typeof id === 'string') {
      return this.service.delete({ where: { id } });
    }
    return this.service.delete({ where: { id: Number(id) } });
  }
}
