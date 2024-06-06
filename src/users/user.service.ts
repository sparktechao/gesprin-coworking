import { Injectable } from '@nestjs/common';
import { BaseGenericService } from '../common/services/base-generic-service';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entidades/user.entity';

@Injectable()
export class UserService extends BaseGenericService<User> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'user');
  }
}
