import { Controller, Get, Query, UseGuards, Req, Res } from '@nestjs/common';
import { GoogleService } from './google.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('auth-url')
  @UseGuards(JwtAuthGuard)
  getAuthUrl(@Req() req: any) {
     // Assuming req.user contains the staffId if logged in as STAFF
     const staffId = req.user.id; // Map appropriately based on your decoded JWT
     const url = this.googleService.getAuthUrl(staffId);
     return { url };
  }

  @Get('callback')
  async googleAuthCallback(@Query('code') code: string, @Query('state') state: string, @Res() res: any) {
      if (!code || !state) {
          return res.status(400).send('Invalid request. Missing code or state (Staff ID).');
      }

      await this.googleService.handleCallback(code, state);
      
      // Redirect back to the frontend dashboard settings
      return res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000/dashboard/settings');
  }
}
