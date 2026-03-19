import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { WhatsappService } from '../whatsapp/whatsapp.service.js';
import { EmailService } from '../email/email.service.js';

@Processor('reminders')
export class ReminderProcessor extends WorkerHost {
  private readonly logger = new Logger(ReminderProcessor.name);

  constructor(
      private prisma: PrismaService,
      private whatsappService: WhatsappService,
      private emailService: EmailService
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.debug(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}`);

    switch (job.name) {
      case 'appointment-reminder':
        await this.handleAppointmentReminder(job.data.appointmentId);
        break;
      default:
        this.logger.warn(`Unknown job name: ${job.name}`);
    }
  }

  private async handleAppointmentReminder(appointmentId: string) {
      const appointment = await this.prisma.appointment.findUnique({
          where: { id: appointmentId },
          include: {
              customer: true,
              service: true,
              tenant: true
          }
      });

      if (!appointment || appointment.status !== 'CONFIRMED') {
          return; // Skip cancelled/completed appointments
      }

      this.logger.log(`Dispatching reminders for Appointment: ${appointmentId}`);

      const appointmentDetails = {
          serviceName: appointment.service.name,
          dateTime: appointment.startTime.toLocaleString(),
          tenantName: appointment.tenant.name
      };

      // 1. Send Email Reminder
      if (appointment.customer.email) {
          await this.emailService.sendAppointmentConfirmation(appointment.customer.email, appointmentDetails);
      }

      // 2. Send WhatsApp Reminder
      if (appointment.customer.phone) {
          await this.whatsappService.sendAppointmentReminder(appointment.customer.phone, appointmentDetails);
      }
  }
}
