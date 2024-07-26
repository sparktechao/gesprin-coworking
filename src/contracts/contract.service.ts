import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { Contract, ContractStatus, ContractType } from '@prisma/client';
import { CreateContractDto } from './dto/create-contract.dto';
import { generateNuc } from './utils/nuc-generator.utils';
import { EmailNotificationService } from 'src/common/notifications/email.notification.service';
import { SmsNotificationService } from 'src/common/notifications/sms-notification.service';
import { BaseGenericService } from '../common/services/base-generic-service';

@Injectable()
export class ContractsService extends BaseGenericService<Contract> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailNotificationService: EmailNotificationService,
    private readonly smsNotificationService: SmsNotificationService,
  ) {
    super(prismaService, 'contract');
  }

  utf8_to_b64(str: string): string {
    return Buffer.from(str).toString('base64');
  }

  async createWithInitialValue(
    createContractDto: CreateContractDto,
  ): Promise<Contract> {
    const { amount, roomId, ...contractData } = createContractDto;

    // Ensure status is always DRAFT
    contractData.status = ContractStatus.DRAFT;

    // Generate NUC
    const nuc = generateNuc();

    const coworker = await this.prismaService.coworker.findUnique({
      where: { id: contractData.coworkerId },
    });

    // Check if the contract type is ROOM and if roomId is provided
    if (contractData.contractType === ContractType.ROOM && !roomId) {
      throw new BadRequestException(
        'RoomId is required for ROOM type contracts.',
      );
    }

    // Check if the room is already associated with an active contract
    if (roomId) {
      const activeContracts = await this.prismaService.contract.findMany({
        where: {
          roomId: roomId,
          status: {
            in: [ContractStatus.ACTIVE, ContractStatus.DRAFT],
          },
        },
      });

      if (activeContracts.length > 0) {
        throw new BadRequestException(
          'Room is already assigned to an active contract.',
        );
      }
    }

    const contract = await this.prismaService.contract.create({
      data: {
        coworkerId: contractData.coworkerId,
        nuc: nuc, // Use generated NUC
        startDate: new Date(Date.now()),
        endDate: new Date(),
        contractType: contractData.contractType,
        status: contractData.status,
        previousContractId: contractData.previousContractId,
        roomId: roomId,
      },
    });

    if (amount !== undefined) {
      await this.prismaService.contractValue.create({
        data: {
          contractId: contract.id,
          amount,
        },
      });
    }

    if (coworker) {
      const linkData = {
        id: contract.id,
        name: coworker.name,
        email: coworker.email,
        nuc: contract.nuc,
        status: contractData.status,
        amount: amount,
      };

      const encodedData = this.utf8_to_b64(JSON.stringify(linkData));
      const activationLink = `https://app.gesprin.co.ao/confirm-account/${encodedData}`;

      const emailHtmlBody = `<strong>Caro(a) ${coworker.name},</strong><br>O seu novo contrato foi criado com o NUC: ${contract.nuc}. Clique <a href="${activationLink}">aqui</a> para confirmar a sua conta.`;
      const emailTextBody = `Caro(a) ${coworker.name}, O seu novo contrato foi criado com o NUC: ${contract.nuc}. Visite o seguinte link para confirmar a sua conta: ${activationLink}`;

      await this.emailNotificationService.sendEmail(
        coworker.email,
        'Novo Contrato Criado',
        emailHtmlBody,
        emailTextBody,
      );

      const phoneNumber = coworker.phone.slice(-9); // Last 9 digits of the phone number

      await this.smsNotificationService.sendSms(
        phoneNumber,
        `Prezado(a) ${coworker.name}, o seu novo contrato com o  NUC: ${nuc} foi criado com sucesso. Status: ${contractData.status}. Ative seu contrato aqui: ${activationLink}`,
      );

      return contract;
    }
  }

  async findContractWithLatestValue(id: string): Promise<Contract | null> {
    const contract = await this.prismaService.contract.findUnique({
      where: { id },
      include: {
        contractValues: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    return contract;
  }

  async findAllContractsWithLatestValue(): Promise<Contract[]> {
    const contracts = await this.prismaService.contract.findMany({
      include: {
        contractValues: {
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    });

    return contracts;
  }

  async updateContractStatus(
    contractId: string,
    newStatus: ContractStatus,
  ): Promise<Contract> {
    const contract = await this.prismaService.contract.findUnique({
      where: { id: contractId },
      include: { coworker: true },
    });

    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    if (contract.status !== ContractStatus.DRAFT) {
      throw new BadRequestException(
        `Não lhe é permitido alterar o status deste contrato. Status actual: ${contract.status}`,
      );
    }

    const updatedContract = await this.prismaService.contract.update({
      where: { id: contractId },
      data: { status: newStatus },
    });

    const coworker = contract.coworker;
    const emailHtmlBody = `<strong>Caro(a) ${coworker.name},</strong><br>O estado do seu contrato foi atualizado para ${newStatus}.`;
    const emailTextBody = `Caro(a) ${coworker.name}, O estado do seu contrato foi atualizado para ${newStatus}.`;

    await this.emailNotificationService.sendEmail(
      coworker.email,
      'Contrato Atualizado',
      emailHtmlBody,
      emailTextBody,
    );

    return updatedContract;
  }
}
