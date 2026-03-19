import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) { }

  create(createServiceDto: any) {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  findAllByTenant(tenantId: string) {
    return this.prisma.service.findMany({
      where: { tenantId },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({ where: { id } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async findOneByTenant(id: string, tenantId: string) {
    const service = await this.prisma.service.findFirst({ where: { id, tenantId } });
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  update(id: string, updateServiceDto: any) {
    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async updateByTenant(id: string, tenantId: string, updateServiceDto: any) {
    const service = await this.findOneByTenant(id, tenantId); // ensure it belongs to this tenant
    return this.prisma.service.update({
      where: { id: service.id },
      data: updateServiceDto,
    });
  }

  remove(id: string) {
    return this.prisma.service.delete({
      where: { id },
    });
  }

  async removeByTenant(id: string, tenantId: string) {
    const service = await this.findOneByTenant(id, tenantId); // ensure it belongs to this tenant
    return this.prisma.service.delete({
      where: { id: service.id },
    });
  }
}
