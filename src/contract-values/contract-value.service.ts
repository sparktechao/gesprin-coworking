// src/contract-values/contract-values.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ContractValue } from './entities/contract-value.interface';
import { CreateContractValueDto } from './dto/create-contract-value.dto';

@Injectable()
export class ContractValuesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateContractValueDto): Promise<ContractValue> {
    try {
      return await this.prisma.contractValue.create({
        data,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<ContractValue[]> {
    try {
      return await this.prisma.contractValue.findMany();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: string): Promise<ContractValue | null> {
    try {
      const entity = await this.prisma.contractValue.findUnique({
        where: { id },
      });
      if (!entity) {
        throw new NotFoundException(`ContractValue not found`);
      }
      return entity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
