// src/common/services/base-generic-service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

type Delegate<T> = {
  findMany: (args?: any) => Promise<T[]>;
  findUnique: (args: any) => Promise<T | null>;
  create: (args: any) => Promise<T>;
  update: (args: any) => Promise<T>;
  delete: (args: any) => Promise<T>;
};

function createDelegate<T>(model: any): Delegate<T> {
  return {
    findMany: (args) => model.findMany(args),
    findUnique: (args) => model.findUnique(args),
    create: (args) => model.create(args),
    update: (args) => model.update(args),
    delete: (args) => model.delete(args),
  };
}

@Injectable()
export class BaseGenericService<T> {
  private readonly delegate: Delegate<T>;

  constructor(prismaService: PrismaService, modelName: keyof PrismaService) {
    this.delegate = createDelegate<T>(prismaService[modelName]);
  }

  async findAll(args?: any): Promise<T[]> {
    try {
      return await this.delegate.findMany(args);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(args: any): Promise<T | null> {
    try {
      const entity = await this.delegate.findUnique({
        where: {
          id: args.where.id.toString(), // Ensure id is treated as a string
        },
      });
      if (!entity) {
        throw new NotFoundException(`Entity not found`);
      }
      return entity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async create(args: any): Promise<T> {
    try {
      return await this.delegate.create(args);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(args: any): Promise<T> {
    try {
      const entity = await this.delegate.update(args);
      if (!entity) {
        throw new NotFoundException(`Entity not found for update`);
      }
      return entity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(args: any): Promise<T> {
    try {
      const entity = await this.delegate.delete(args);
      if (!entity) {
        throw new NotFoundException(`Entity not found for deletion`);
      }
      return entity;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
