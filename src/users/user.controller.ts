// src/users/user.controller.ts

import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

import { BaseGenericController } from '../common/controllers/base-generic-controller';
import { User } from './entidades/user.entity';

@Controller('users')
export class UserController extends BaseGenericController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(userService: UserService) {
    super(userService, 'users');
  }
}
