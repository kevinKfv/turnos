import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AnalyticsService {
    private readonly logger = new Logger(AnalyticsService.name);

    constructor(private prisma: PrismaService) {}

    async getDashboardMetrics(tenantId: string) {
        this.logger.log(`Fetching analytics for tenant: ${tenantId}`);

        // 1. Total Appointments (All time or could be filtered by date range)
        const totalAppointments = await this.prisma.appointment.count({
            where: { tenantId }
        });

        // 2. Upcoming Appointments (Status Pending or Confirmed in the future)
        const upcomingAppointments = await this.prisma.appointment.count({
            where: {
                tenantId,
                status: { in: ['PENDING', 'CONFIRMED'] },
                startTime: { gt: new Date() }
            }
        });

        // 3. Total Customers
        const totalCustomers = await this.prisma.customer.count({
            where: { tenantId }
        });

        // 4. Calculate Revenue (Completed Appointments * Service Price)
        const completedAppointments = await this.prisma.appointment.findMany({
            where: {
                tenantId,
                status: 'COMPLETED'
            },
            include: {
                service: true
            }
        });

        const totalRevenue = completedAppointments.reduce((sum, appt) => sum + appt.service.price, 0);

        // 5. Recent Activity (Last 5 appointments booked)
        const recentActivity = await this.prisma.appointment.findMany({
            where: { tenantId },
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                customer: { select: { name: true, email: true } },
                service: { select: { name: true, price: true } }
            }
        });

        return {
            totalAppointments,
            upcomingAppointments,
            totalCustomers,
            totalRevenue,
            recentActivity
        };
    }
}
