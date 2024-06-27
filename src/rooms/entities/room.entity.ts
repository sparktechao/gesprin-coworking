// src/rooms/entities/room.entity.ts
import { Room } from './room.interface';

export class RoomEntity implements Room {
  id: string;
  name: string;
  location: string;

  constructor(partial: Partial<RoomEntity>) {
    Object.assign(this, partial);
  }
}
