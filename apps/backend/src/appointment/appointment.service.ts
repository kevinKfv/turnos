import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) { }

  async create(createAppointmentDto: any) {
    // Basic logic for MVP. 
    // In production, you would handle creating Customer if they don't exist based on the passed DTO email.
    // For this boilerplate, we pass customerId blindly.
    const { tenantId, customerId, staffId, serviceId, startTime, endTime } = createAppointmentDto;

    return this.prisma.appointment.create({
      data: {
        tenantId,
        customerId,
        staffId,
        serviceId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        status: 'PENDING'
      },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      include: { service: true, staff: true, customer: true }
    });
  }

  findAllByTenant(tenantId: string) {
    return this.prisma.appointment.findMany({
      where: { tenantId },
      include: { service: true, staff: true, customer: true }
    });
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { service: true, staff: true, customer: true }
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async findOneByTenant(id: string, tenantId: string) {
    const appointment = await this.prisma.appointment.findFirst({
      where: { id, tenantId },
      include: { service: true, staff: true, customer: true }
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  update(id: string, updateAppointmentDto: any) {
    return this.prisma.appointment.update({
      where: { id },
      data: updateAppointmentDto,
    });
  }

  async updateByTenant(id: string, tenantId: string, updateAppointmentDto: any) {
    const appointment = await this.findOneByTenant(id, tenantId); // ensure it belongs to this tenant
    return this.prisma.appointment.update({
      where: { id: appointment.id },
      data: updateAppointmentDto,
    });
  }

  remove(id: string) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }

  async removeByTenant(id: string, tenantId: string) {
    const appointment = await this.findOneByTenant(id, tenantId); // ensure it belongs to this tenant
    return this.prisma.appointment.delete({
      where: { id: appointment.id },
    });
  }
}
