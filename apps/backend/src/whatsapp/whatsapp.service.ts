import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class WhatsappService {
  private twilioClient: Twilio;
  private readonly logger = new Logger(WhatsappService.name);

  constructor() {
    // In production, instantiate via ConfigService explicitly
    const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC_MOCK_SID';
    const authToken = process.env.TWILIO_AUTH_TOKEN || 'MOCK_TOKEN';
    
    // For local dev without credentials, we just mock the client
    if (accountSid === 'AC_MOCK_SID') {
        this.logger.warn('Twilio credentials not found. WhatsApp messages will only be logged.');
    } else {
        this.twilioClient = new Twilio(accountSid, authToken);
    }
  }

  async sendAppointmentReminder(phoneNumber: string, appointmentDetails: any) {
      const messageBody = `Hi from BookFlow! Just a reminder that you have an upcoming appointment for ${appointmentDetails.serviceName} on ${appointmentDetails.dateTime}. Reply C to confirm or X to cancel.`;
      
      try {
          if (!this.twilioClient) {
             this.logger.log(`[MOCK WHATSAPP] To: ${phoneNumber} | Message: ${messageBody}`);
             return;
          }

          const response = await this.twilioClient.messages.create({
              body: messageBody,
              from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
              to: `whatsapp:${phoneNumber}`
          });
          
          this.logger.log(`WhatsApp reminder sent to ${phoneNumber}. Message SID: ${response.sid}`);
      } catch (error) {
          this.logger.error(`Failed to send WhatsApp message to ${phoneNumber}`, error);
      }
  }
}
