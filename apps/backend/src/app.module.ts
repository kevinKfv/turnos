import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

import { PrismaModule } from './prisma/prisma.module.js';
import { AuthModule } from './auth/auth.module.js';
import { TenantModule } from './tenant/tenant.module.js';
import { UserModule } from './user/user.module.js';
import { ServiceModule } from './service/service.module.js';
import { StaffModule } from './staff/staff.module.js';
import { AppointmentModule } from './appointment/appointment.module.js';
import { EmailModule } from './email/email.module.js';
import { WhatsappModule } from './whatsapp/whatsapp.module.js';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bullmq';
import { GoogleModule } from './google/google.module.js';
import { AnalyticsModule } from './analytics/analytics.module.js';
import { PaymentModule } from './payment/payment.module.js';

@Module({
  imports: [PrismaModule, AuthModule, TenantModule, UserModule, ServiceModule, StaffModule, AppointmentModule, EmailModule, WhatsappModule, GoogleModule, AnalyticsModule, PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
