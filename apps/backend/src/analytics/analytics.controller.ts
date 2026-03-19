import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AnalyticsService } from './analytics.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';

@Controller('analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get()
  @Roles('BUSINESS_OWNER', 'STAFF') // Staff usually have limited analytics, but kept simple for MVP
  async getDashboardMetrics(@Req() req: any) {
     const tenantId = req.user.tenantId;
     return this.analyticsService.getDashboardMetrics(tenantId);
  }
}
