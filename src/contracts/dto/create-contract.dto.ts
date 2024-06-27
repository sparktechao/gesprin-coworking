// src/contracts/dto/create-contract.dto.ts
import { ContractType, ContractStatus } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsOptional,
  IsUUID,
  IsNumber,
} from 'class-validator';

export class CreateContractDto {
  @IsUUID()
  @IsNotEmpty()
  coworkerId: string;

  @IsString()
  @IsNotEmpty()
  nuc: string;

  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsEnum(ContractType)
  @IsNotEmpty()
  contractType: ContractType;

  @IsEnum(ContractStatus)
  @IsOptional()
  status?: ContractStatus;

  @IsOptional()
  @IsUUID()
  previousContractId?: string;

  @IsOptional()
  @IsUUID()
  roomId?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  constructor(partial: Partial<CreateContractDto>) {
    Object.assign(this, partial);
    if (!this.status) {
      this.status = ContractStatus.DRAFT; // Default status
    }
    console.log('CreateContractDto constructor called with:', this);
  }
}
