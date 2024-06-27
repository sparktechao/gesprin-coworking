// src/contracts/contracts.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BaseGenericService } from '../common/services/base-generic-service';
import { Contract, ContractStatus, ContractType } from '@prisma/client';
import { CreateContractDto } from './dto/create-contract.dto';
import { generateNuc } from './utils/nuc-generator.utils';
import { EmailNotificationService } from 'src/common/notifications/email.notification.service';
import { JwtService } from 'src/common/jwt/jwt.service';
import { SmsNotificationService } from 'src/common/notifications/sms-notification.service';

@Injectable()
export class ContractsService extends BaseGenericService<Contract> {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly emailNotificationService: EmailNotificationService,
    private readonly smsNotificationService: SmsNotificationService,
    private readonly jwtService: JwtService,
  ) {
    super(prismaService, 'contract');
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
        startDate: new Date(contractData.startDate),
        endDate: new Date(contractData.endDate),
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
      const token = this.jwtService.generateToken({
        name: coworker.name,
        nuc: nuc,
        status: contractData.status,
      });

      if (contract) {
        await this.emailNotificationService.sendEmail(
          coworker.email,
          'Novo Contrato Criado',
          `<strong>Dear ${coworker.name},</strong><br>Your new contract has been created with NUC: ${contract.nuc}. Com o id ${contract.id}, e com o token ${token}`,
          `Dear ${coworker.name}, Your new contract has been created with NUC: ${contract.nuc}. Com o id ${contract.id}`,
        );

        const phoneNumber = coworker.phone.slice(-9); // Last 9 digits of the phone number
        console.log('Sending SMS to:', phoneNumber);
        await this.smsNotificationService.sendSms(
          phoneNumber,
          `Prezado(a) ${coworker.name}, o seu novo contrato com o  NUC: ${nuc} foi criado com sucesso. Status: ${contractData.status}.`,
        );
      }

      return contract;
    }
  }
}
