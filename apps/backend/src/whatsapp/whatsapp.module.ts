import { Module } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service.js';
import { ReminderCronService } from './reminder.cron.js';
import { ReminderProcessor } from './reminder.processor.js';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
      BullModule.registerQueue({
          name: 'reminders'
      })
  ],
  providers: [WhatsappService, ReminderCronService, ReminderProcessor],
  exports: [WhatsappService]
})
export class WhatsappModule {}
