// src/rooms/rooms.controller.ts
import { BadRequestException, Controller, Get } from '@nestjs/common';
import { BaseGenericController } from '../common/controllers/base-generic-controller';
import { Room } from '@prisma/client';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController extends BaseGenericController<
  Room,
  CreateRoomDto,
  UpdateRoomDto
> {
  constructor(private readonly roomsService: RoomsService) {
    super(roomsService);
  }

  @Get('inactive-contracts')
  async findRoomsWithoutActiveContracts() {
    try {
      return await this.roomsService.findRoomsWithoutActiveContracts();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
