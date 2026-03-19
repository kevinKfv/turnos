import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class StaffService {
  constructor(private prisma: PrismaService) { }

  create(createStaffDto: any) {
    return this.prisma.staff.create({
      data: createStaffDto,
    });
  }

  findAllByTenant(tenantId: string) {
    return this.prisma.staff.findMany({
      where: { tenantId },
      include: {
        services: true
      }
    });
  }

  async findOne(id: string) {
    const staff = await this.prisma.staff.findUnique({
      where: { id },
      include: { services: true }
    });
    if (!staff) throw new NotFoundException('Staff not found');
    return staff;
  }

  async findOneByTenant(id: string, tenantId: string) {
    const staff = await this.prisma.staff.findFirst({
      where: { id, tenantId },
      include: { services: true }
    });
    if (!staff) throw new NotFoundException('Staff not found');
    return staff;
  }

  update(id: string, updateStaffDto: any) {
    return this.prisma.staff.update({
      where: { id },
      data: updateStaffDto,
    });
  }

  async updateBySelf(staffId: string, tenantId: string, userId: string, updateStaffDto: any) {
    const staff = await this.findOneByTenant(staffId, tenantId);
    if (staff.userId !== userId) {
      throw new UnauthorizedException('Staff can only edit their own profiles');
    }
    return this.prisma.staff.update({
      where: { id: staff.id },
      data: updateStaffDto
    });
  }

  async updateByTenant(id: string, tenantId: string, updateStaffDto: any) {
    const staff = await this.findOneByTenant(id, tenantId); // ensure it belongs to this tenant
    return this.prisma.staff.update({
      where: { id: staff.id },
      data: updateStaffDto,
    });
  }

  remove(id: string) {
    return this.prisma.staff.delete({
      where: { id },
    });
  }

  async removeByTenant(id: string, tenantId: string) {
    const staff = await this.findOneByTenant(id, tenantId); // ensure it belongs to this tenant
    return this.prisma.staff.delete({
      where: { id: staff.id },
    });
  }
}
