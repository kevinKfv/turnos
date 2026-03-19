import { Injectable, Logger } from '@nestjs/common';
import { google } from 'googleapis';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class GoogleService {
  private readonly logger = new Logger(GoogleService.name);
  private oauth2Client;

  constructor(private prisma: PrismaService) {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID || 'MOCK_CLIENT_ID',
      process.env.GOOGLE_CLIENT_SECRET || 'MOCK_CLIENT_SECRET',
      process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3001/api/google/callback'
    );
  }

  getAuthUrl(staffId: string) {
    // Generate a secure URL to redirect users to Google for OAuth authorization
    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events',
    ];

    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline', // Request a refresh token
      scope: scopes,
      state: staffId, // Pass the staff ID to identify who is linking the account
      prompt: 'consent' // Force Google to always return a refresh token
    });
  }

  async handleCallback(code: string, staffId: string) {
    try {
        if (process.env.GOOGLE_CLIENT_ID === 'MOCK_CLIENT_ID') {
            this.logger.warn(`Mocking Google OAuth callback for staff ${staffId}`);
            return { success: true };
        }

        const { tokens } = await this.oauth2Client.getToken(code);
        
        // Since Prisma requires the tokens to be strongly typed,
        // For MVP, we'll store them serialized as JSON or extend the Staff model.
        // As a shortcut, we update the existing `workingHours` or create a new field
        await this.prisma.staff.update({
            where: { id: staffId },
            data: {
               // Assuming the schema has an 'oauthTokens' JSON field, if not,
               // we serialize to workingHours (hacky) or ideally run a migration.
               // Best practice: add an OAuth table.
            }
        });
        
        this.logger.log(`Successfully authenticated Google Calendar for staff ${staffId}`);
        return { success: true };
    } catch (error) {
        this.logger.error(`Error exchanging Google OAuth code for staff ${staffId}`, error);
        throw error;
    }
  }

  async createEvent(staffId: string, appointmentDetails: any) {
     // 1. Fetch staff tokens from DB
     // 2. Set credentials on oauth2Client
     // 3. const calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
     // 4. calendar.events.insert(...)
     this.logger.log(`[MOCK GOOGLE SYNC] Pushing event to Calendar for Staff: ${staffId}`);
  }
}
