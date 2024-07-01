// src/common/services/base-generic-service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

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
      this.handlePrismaError(error);
    }
  }

  async findOne(args: any): Promise<T | null> {
    try {
      const entity = await this.delegate.findUnique({
        where: {
          id: args.where.id.toString(),
        },
      });
      if (!entity) {
        throw new NotFoundException(`Entity not found`);
      }
      return entity;
    } catch (error) {
      this.handlePrismaError(error);
    }
  }

  async create(args: any): Promise<T> {
    try {
      return await this.delegate.create(args);
    } catch (error) {
      this.handlePrismaError(error);
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
      this.handlePrismaError(error);
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
      this.handlePrismaError(error);
    }
  }

  private handlePrismaError(error: any): never {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new BadRequestException(this.getPrismaErrorMessage(error));
    }
    throw new BadRequestException(error.message);
  }

  private getPrismaErrorMessage(
    error: Prisma.PrismaClientKnownRequestError,
  ): string {
    switch (error.code) {
      case 'P2002':
        return `Erro de unicidade: O campo ${error.meta.target} já existe.`;
      case 'P2014':
        return 'Erro de restrição de chave estrangeira: O registro ainda está sendo referenciado por outro registro.';
      case 'P2003':
        return `Erro de chave estrangeira - |P2003|: ${error.message}`;
      default:
        return 'Erro de banco de dados desconhecido.';
    }
  }
}
