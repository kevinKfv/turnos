import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;
    private readonly logger = new Logger(EmailService.name);

    constructor() {
        // For MVP/Local dev, using ethereal mail (or logging)
        // In production, inject credentials from ConfigService (SendGrid/Resend)
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
            port: parseInt(process.env.EMAIL_PORT || '587'),
            auth: {
                user: process.env.EMAIL_USER || 'test@ethereal.email',
                pass: process.env.EMAIL_PASS || 'password',
            },
        });
    }

    async sendAppointmentConfirmation(email: string, appointmentDetails: any) {
        const defaultSubject = `Appointment Confirmed - ${appointmentDetails.serviceName}`;
        const htmlContent = `
        <h2>Your appointment is confirmed!</h2>
        <p>Hi,</p>
        <p>This email is to confirm your booking for <strong>${appointmentDetails.serviceName}</strong>.</p>
        <p><strong>Date & Time:</strong> ${appointmentDetails.dateTime}</p>
        <br/>
        <p>Thank you for using BookFlow.</p>
    `;

        try {
            const info = await this.transporter.sendMail({
                from: '"BookFlow Scheduling" <noreply@bookflow.app>',
                to: email,
                subject: defaultSubject,
                html: htmlContent,
            });

            this.logger.log(`Confirmation email sent to ${email}. MessageId: ${info.messageId}`);
        } catch (error) {
            this.logger.error(`Failed to send email to ${email}`, error.stack);
        }
    }
}
