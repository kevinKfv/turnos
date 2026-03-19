import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  create(createUserDto: any) {
    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany({ select: { id: true, email: true, role: true, tenantId: true, createdAt: true } });
  }

  findAllByTenant(tenantId: string) {
    return this.prisma.user.findMany({
      where: { tenantId },
      select: { id: true, email: true, role: true, tenantId: true, createdAt: true }
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true, email: true, role: true, tenantId: true } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByTenant(id: string, tenantId: string) {
    const user = await this.prisma.user.findFirst({ where: { id, tenantId }, select: { id: true, email: true, role: true, tenantId: true } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: string, updateUserDto: any) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }

  async updateByTenant(id: string, tenantId: string, updateUserDto: any) {
    const user = await this.findOneByTenant(id, tenantId); // verify
    return this.prisma.user.update({ where: { id: user.id }, data: updateUserDto });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async removeByTenant(id: string, tenantId: string) {
    const user = await this.findOneByTenant(id, tenantId); // verify
    return this.prisma.user.delete({ where: { id: user.id } });
  }
}
