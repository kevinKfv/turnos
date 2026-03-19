import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TenantService } from './tenant.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '@repo/database';

@Controller('tenant')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TenantController {
  constructor(private readonly tenantService: TenantService) { }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  create(@Body() createTenantDto: any) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN)
  findAll() {
    return this.tenantService.findAll();
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER)
  findOne(@Param('id') id: string, @Req() req: any) {
    // Basic tenant isolation check
    if (req.user.role !== Role.SUPER_ADMIN && req.user.tenantId !== id) {
      throw new Error('Unauthorized access to tenant');
    }
    return this.tenantService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER)
  update(@Param('id') id: string, @Body() updateTenantDto: any, @Req() req: any) {
    if (req.user.role !== Role.SUPER_ADMIN && req.user.tenantId !== id) {
      throw new Error('Unauthorized access to tenant');
    }
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN)
  remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }
}
