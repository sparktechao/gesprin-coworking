import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(username: string): Promise<CreateUserDto | undefined> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    return user;
  }

  async create(user: Partial<CreateUserDto>): Promise<CreateUserDto> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.prismaService.user.create({
      data: {
        ...user,
        password: hashedPassword,
        username: user.username,
        email: user.email,
      },
    });
  }
}
