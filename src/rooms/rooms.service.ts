// src/rooms/rooms.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseGenericService } from '../common/services/base-generic-service';
import { Room } from './entities/room.interface';

@Injectable()
export class RoomsService extends BaseGenericService<Room> {
  constructor(private prismaService: PrismaService) {
    super(prismaService, 'room');
  }

  async findRoomsWithoutActiveContracts() {
    try {
      const rooms = await this.prismaService.room.findMany({
        where: {
          contracts: {
            none: {
              status: 'ACTIVE',
            },
          },
        },
      });
      return rooms;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
