// src/reports/reports.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getReservationReport(startDate: Date, endDate: Date) {
    return this.prisma.reservation.findMany({
      where: {
        startTime: {
          gte: startDate,
        },
        endTime: {
          lte: endDate,
        },
      },
      include: {
        room: true,
        coworker: true,
      },
    });
  }
}
