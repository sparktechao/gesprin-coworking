// src/rooms/dto/create-room.dto.ts
import { IsString } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsString()
  location: string;
}
