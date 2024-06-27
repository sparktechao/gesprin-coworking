// src/contract-values/entities/contract-value.entity.ts
import { ContractValue } from './contract-value.interface';

export class ContractValueEntity implements ContractValue {
  id: string;
  contractId: string | null;
  createdAt: Date;
  amount: number;

  constructor(partial: Partial<ContractValueEntity>) {
    Object.assign(this, partial);
  }
}
