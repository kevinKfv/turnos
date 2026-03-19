import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { Role } from '@repo/database';
import * as bcrypt from 'bcrypt';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER)
  async create(@Body() createUserDto: any, @Req() req: any) {
    if (req.user.role === Role.BUSINESS_OWNER) {
      createUserDto.tenantId = req.user.tenantId; // Force tenant context
    }

    // Hash password
    if (createUserDto.password) {
      createUserDto.passwordHash = await bcrypt.hash(createUserDto.password, 10);
      delete createUserDto.password;
    }

    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER, Role.STAFF)
  findAll(@Req() req: any) {
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.userService.findAll();
    }
    return this.userService.findAllByTenant(req.user.tenantId);
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER, Role.STAFF)
  findOne(@Param('id') id: string, @Req() req: any) {
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.userService.findOne(id);
    }
    return this.userService.findOneByTenant(id, req.user.tenantId);
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER)
  async update(@Param('id') id: string, @Body() updateUserDto: any, @Req() req: any) {
    if (updateUserDto.password) {
      updateUserDto.passwordHash = await bcrypt.hash(updateUserDto.password, 10);
      delete updateUserDto.password;
    }

    if (req.user.role === Role.SUPER_ADMIN) {
      return this.userService.update(id, updateUserDto);
    }
    return this.userService.updateByTenant(id, req.user.tenantId, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN, Role.BUSINESS_OWNER)
  remove(@Param('id') id: string, @Req() req: any) {
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.userService.remove(id);
    }
    return this.userService.removeByTenant(id, req.user.tenantId);
  }
}
