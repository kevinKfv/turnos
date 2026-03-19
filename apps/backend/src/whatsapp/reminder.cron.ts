import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ReminderCronService {
  private readonly logger = new Logger(ReminderCronService.name);

  constructor(
    @InjectQueue('reminders') private readonly remindersQueue: Queue,
    private prisma: PrismaService
  ) {}

  // Run every hour to check for upcoming appointments in exactly 24 hours
  @Cron(CronExpression.EVERY_HOUR)
  async scheduleUpcomingReminders() {
    this.logger.debug('Running cron job to find appointments for 24h reminders...');

    const now = new Date();
    const tomorrowStart = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now
    
    // Set bounds to finding anything in the current hour block tomorrow
    const hourStart = new Date(tomorrowStart);
    hourStart.setMinutes(0, 0, 0);
    
    const hourEnd = new Date(tomorrowStart);
    hourEnd.setMinutes(59, 59, 999);

    const upcomingAppointments = await this.prisma.appointment.findMany({
        where: {
            startTime: {
                gte: hourStart,
                lte: hourEnd
            },
            status: 'CONFIRMED'
        }
    });

    for (const appt of upcomingAppointments) {
        // Enqueue a job into BullMQ
        await this.remindersQueue.add(
            'appointment-reminder', 
            { appointmentId: appt.id },
            { 
                jobId: `reminder-${appt.id}`, // Prevent duplicate queuing 
                removeOnComplete: true
            }
        );
        this.logger.log(`Queued reminder job for appointment ${appt.id}`);
    }
  }
}
