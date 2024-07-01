import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';

import { ErrorLoggingMiddleware } from './common/middleware/error-loggin.middleware';
import { CoworkersModule } from './coworkers/coworker.module';
import { ContractsModule } from './contracts/contract.module';
import { PaymentsModule } from './payments/payments.module';
import { WorkstationsModule } from './workstations/workstations.module';
import { RoomsModule } from './rooms/rooms.module';
import { PrintsModule } from './prints/prints.module';
import { InvoicesModule } from './invoices/invoice.module';
import { ReservationsModule } from './reservations/reservation.module';
import { ReportsModule } from './reports/reports.module';
import { ContractValuesModule } from './contract-values/contract-value.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EmailNotificationService } from './common/notifications/email.notification.service';
import { SmsNotificationService } from './common/notifications/sms-notification.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PdfService } from './common/services/pdf.service';

@Module({
  imports: [
    PrismaModule,
    CoworkersModule,
    ContractsModule,
    PaymentsModule,
    WorkstationsModule,
    RoomsModule,
    PrintsModule,
    InvoicesModule,
    ReservationsModule,
    ReportsModule,
    ContractValuesModule,
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    EmailNotificationService,
    SmsNotificationService,
    PdfService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ErrorLoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
