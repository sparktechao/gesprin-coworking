// src/contracts/entities/contract.interface.ts
import { ContractStatus, ContractType, Coworker } from '@prisma/client';

export interface Contract {
  id: string;
  coworkerId: string;
  nuc: string;
  startDate: Date;
  endDate: Date;
  contractType: ContractType;
  previousContractId?: string;
  roomId?: string;
  status: ContractStatus;
  coworker?: Coworker;
}
