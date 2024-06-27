// src/workstations/entities/workstation.entity.ts
import { Workstation } from './workstation.interface';

export class WorkstationEntity implements Workstation {
  id: string;
  roomId: string;
  stationNumber: string;

  constructor(partial: Partial<WorkstationEntity>) {
    Object.assign(this, partial);
  }
}
