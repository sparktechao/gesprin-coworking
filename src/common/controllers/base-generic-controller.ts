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
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BaseGenericService } from '../services/base-generic-service';

@Controller()
export class BaseGenericController<T, CreateDto, UpdateDto> {
  constructor(private readonly service: BaseGenericService<T>) {}

  @Get()
  async findAll(): Promise<T[]> {
    try {
      return await this.service.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<T | null> {
    try {
      return await this.service.findOne({ where: { id: String(id) } });
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createDto: CreateDto): Promise<T> {
    console.log('createDto', createDto);
    try {
      return await this.service.create({ data: createDto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<T> {
    try {
      return await this.service.update({
        where: { id: String(id) },
        data: updateDto,
      });
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<T> {
    try {
      return await this.service.delete({ where: { id: String(id) } });
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }
}
