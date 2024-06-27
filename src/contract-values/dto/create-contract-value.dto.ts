// src/contract-values/dto/create-contract-value.dto.ts
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContractValueDto {
  @ApiProperty({ example: '1' })
  @IsString()
  contractId: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  amount: number;
}
