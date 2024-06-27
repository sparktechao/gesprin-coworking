// src/coworkers/dto/create-coworker.dto.ts
import { IsString, IsArray, IsEmail, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { NotificationPreference } from '@prisma/client';

export class CreateCoworkerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  nif: string;

  @IsString()
  commercialCertificate: string;

  @IsArray()
  @IsEnum(NotificationPreference, { each: true })
  notificationPreferences: NotificationPreference[];
}

export class UpdateCoworkerDto extends PartialType(CreateCoworkerDto) {}
