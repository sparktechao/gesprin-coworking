// src/contracts/entities/contract.entity.ts
import { $Enums, Contract } from '@prisma/client';

export class ContractEntity implements Contract {
  id: string;
  coworkerId: string;
  nuc: string;
  startDate: Date;
  endDate: Date;
  contractType: $Enums.ContractType;
  previousContractId: string;
  roomId: string;
  status: $Enums.ContractStatus;

  constructor(partial: Partial<ContractEntity>) {
    Object.assign(this, partial);
  }
}
