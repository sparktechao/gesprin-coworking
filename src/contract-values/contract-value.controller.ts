// src/contract-values/contract-values.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateContractValueDto } from './dto/create-contract-value.dto';
import { ContractValue } from './entities/contract-value.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContractValuesService } from './contract-value.service';

@ApiTags('contract-values')
@Controller('contract-values')
export class ContractValuesController {
  constructor(private readonly contractValuesService: ContractValuesService) {}

  @ApiOperation({ summary: 'Retrieve all contract values' })
  @ApiResponse({ status: 200, description: 'List of all contract values.' })
  @Get()
  async findAll(): Promise<ContractValue[]> {
    try {
      return await this.contractValuesService.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Retrieve a contract value by ID' })
  @ApiResponse({ status: 200, description: 'The contract value.' })
  @ApiResponse({ status: 404, description: 'Contract value not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ContractValue | null> {
    try {
      return await this.contractValuesService.findOne(id);
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  @ApiOperation({ summary: 'Create a new contract value' })
  @ApiResponse({ status: 201, description: 'The created contract value.' })
  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body() createDto: CreateContractValueDto,
  ): Promise<ContractValue> {
    try {
      return await this.contractValuesService.create(createDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
