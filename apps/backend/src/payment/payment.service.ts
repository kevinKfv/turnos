import { Injectable, Logger } from '@nestjs/common';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);
    private readonly mpClient: MercadoPagoConfig;

    constructor(private prisma: PrismaService) {
        // Initialize Mercado Pago SDK Client
        const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN || 'TEST-mocked-token';
        this.mpClient = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });
    }

    async createCheckoutLink(appointmentId: string, successUrl?: string, failureUrl?: string) {
        this.logger.log(`Creating Checkout Preference for Appointment: ${appointmentId}`);

        // 1. Fetch appointment details and service price
        const appointment = await this.prisma.appointment.findUnique({
            where: { id: appointmentId },
            include: { service: true, customer: true, tenant: true }
        });

        if (!appointment) throw new Error('Appointment not found');

        // 2. Initialize the Preference module with the client
        const preference = new Preference(this.mpClient);

        // 3. Create preference payload
        const result = await preference.create({
            body: {
                payment_methods: {
                    excluded_payment_types: [{ id: 'ticket' }], // Disable cash payments
                    installments: 1,
                },
                items: [
                    {
                        id: appointment.serviceId,
                        title: `${appointment.service.name} - ${appointment.tenant.name}`,
                        description: `Appointment with ${appointment.tenant.name}`,
                        quantity: 1,
                        unit_price: appointment.service.price,
                        currency_id: 'ARS', // Change to localized currency based on Tenant later
                    }
                ],
                payer: {
                    name: appointment.customer.name,
                    email: appointment.customer.email,
                },
                back_urls: {
                    success: successUrl || `${process.env.FRONTEND_URL}/payment/success`,
                    failure: failureUrl || `${process.env.FRONTEND_URL}/payment/failure`,
                    pending: `${process.env.FRONTEND_URL}/payment/pending`,
                },
                auto_return: 'approved',
                external_reference: appointmentId, // Webhook will use this to find the appointment
                notification_url: `${process.env.API_URL}/api/payment/webhook`,
            }
        });

        return {
            checkoutUrl: result.init_point,
            sandboxUrl: result.sandbox_init_point,
            preferenceId: result.id
        };
    }

    async processWebhook(paymentId: string) {
        // In a real scenario, we should fetch payment details from MP to verify:
        // const payment = new Payment(this.mpClient);
        // const paymentInfo = await payment.get({ id: paymentId });
        
        // This is simplified for MVP webhook confirmation
        this.logger.log(`Received Webhook for Payment ID: ${paymentId}`);

        // Typically, we extract the `external_reference` (which is the appointment ID)
        // and update the appointment DB status:
        // await this.prisma.appointment.update({
        //     where: { id: external_reference },
        //     data: { status: 'CONFIRMED' }
        // });
        
        return { success: true };
    }
}
