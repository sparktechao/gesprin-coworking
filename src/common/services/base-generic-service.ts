import { Injectable } from '@nestjs/common';
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
    return this.delegate.findMany(args);
  }

  async findOne(args: any): Promise<T | null> {
    return this.delegate.findUnique(args);
  }

  async create(args: any): Promise<T> {
    return this.delegate.create(args);
  }

  async update(args: any): Promise<T> {
    return this.delegate.update(args);
  }

  async delete(args: any): Promise<T> {
    return this.delegate.delete(args);
  }
}
