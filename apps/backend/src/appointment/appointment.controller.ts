import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '@repo/database';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) { }

  // Public booking endpoint - No authentication required for Customers creating an appointment online 
  // (Customer gets matched by email or created automatically)
  @Post()
  create(@Body() createAppointmentDto: any) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER, Role.STAFF)
  findAll(@Req() req: any) {
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.appointmentService.findAll();
    }
    // Staff should probably only see their own, but for MVP it's fine if they see calendar
    return this.appointmentService.findAllByTenant(req.user.tenantId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER, Role.STAFF)
  findOne(@Param('id') id: string, @Req() req: any) {
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.appointmentService.findOne(id);
    }
    return this.appointmentService.findOneByTenant(id, req.user.tenantId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER, Role.STAFF)
  update(@Param('id') id: string, @Body() updateAppointmentDto: any, @Req() req: any) {
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.appointmentService.update(id, updateAppointmentDto);
    }
    return this.appointmentService.updateByTenant(id, req.user.tenantId, updateAppointmentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER)
  remove(@Param('id') id: string, @Req() req: any) {
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.appointmentService.remove(id);
    }
    return this.appointmentService.removeByTenant(id, req.user.tenantId);
  }
}
