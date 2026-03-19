import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { StaffService } from './staff.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '@repo/database';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) { }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER)
  create(@Body() createStaffDto: any, @Req() req: any) {
    if (req.user.role === Role.BUSINESS_OWNER) {
      createStaffDto.tenantId = req.user.tenantId; // Ensure staff is created within tenant
    }
    return this.staffService.create(createStaffDto);
  }

  // Public endpoint to see staff available (No Auth needed)
  @Get('tenant/:tenantId')
  findAllByTenant(@Param('tenantId') tenantId: string) {
    return this.staffService.findAllByTenant(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER, Role.STAFF)
  update(@Param('id') id: string, @Body() updateStaffDto: any, @Req() req: any) {
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.staffService.update(id, updateStaffDto);
    }

    // Check if staff can edit their own profile
    if (req.user.role === Role.STAFF) {
      return this.staffService.updateBySelf(id, req.user.tenantId, req.user.id, updateStaffDto);
    }

    return this.staffService.updateByTenant(id, req.user.tenantId, updateStaffDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER)
  remove(@Param('id') id: string, @Req() req: any) {
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.staffService.remove(id);
    }
    return this.staffService.removeByTenant(id, req.user.tenantId);
  }
}
