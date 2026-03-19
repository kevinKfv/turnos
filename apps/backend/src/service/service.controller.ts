import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ServiceService } from './service.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '@repo/database';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER)
  create(@Body() createServiceDto: any, @Req() req: any) {
    if (req.user.role === Role.BUSINESS_OWNER) {
      createServiceDto.tenantId = req.user.tenantId; // Automatically assign tenant
    }
    return this.serviceService.create(createServiceDto);
  }

  // Public endpoint for bookings (No Auth needed)
  @Get('tenant/:tenantId')
  findAllByTenant(@Param('tenantId') tenantId: string) {
    return this.serviceService.findAllByTenant(tenantId);
  }

  // Public endpoint for bookings (No Auth needed)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER)
  update(@Param('id') id: string, @Body() updateServiceDto: any, @Req() req: any) {
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.serviceService.update(id, updateServiceDto);
    }
    return this.serviceService.updateByTenant(id, req.user.tenantId, updateServiceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER)
  remove(@Param('id') id: string, @Req() req: any) {
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.serviceService.remove(id);
    }
    return this.serviceService.removeByTenant(id, req.user.tenantId);
  }
}
