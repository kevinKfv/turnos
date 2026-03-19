import { Controller, Post, Body, Param, HttpCode, Get, Query, Logger } from '@nestjs/common';
import { PaymentService } from './payment.service.js';

@Controller('payment')
export class PaymentController {
  private readonly logger = new Logger(PaymentController.name);

  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout/:appointmentId')
  async createCheckoutUrl(@Param('appointmentId') appointmentId: string, @Body() body: any) {
      const { successUrl, failureUrl } = body;
      return this.paymentService.createCheckoutLink(appointmentId, successUrl, failureUrl);
  }

  @Post('webhook')
  @HttpCode(200) // MP requires returning 200/201 to acknowledge receipt
  async handleWebhook(@Body() payload: any, @Query('type') type: string, @Query('data.id') dataId: string) {
      try {
          // MP uses both `type` via body and query params depending on the notification format (IPN vs Webhooks)
          const isWebhook = payload?.action === 'payment.created' || type === 'payment';
          const paymentId = payload?.data?.id || dataId;

          if (isWebhook && paymentId) {
             await this.paymentService.processWebhook(paymentId);
          }

          return { received: true };
      } catch (error) {
          this.logger.error('Error handling Webhook from MP', error);
          return { received: false, error: 'Webhook processing failed' };
      }
  }
}
