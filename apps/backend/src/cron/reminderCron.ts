// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
exports.startReminderCron = void 0;
import node_cron from 'node-cron';
import * as prismaClient from '../prismaClient';
import * as twilioService from '../services/twilioService';
// Correr cada 10 minutos
const startReminderCron = () => {
    node_cron.schedule('*/10 * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Ejecutando Cron de recordatorios...');
        try {
            const now = new Date();
            // Queremos avisar con 24 horas de antelación
            const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            const upcomingAppointments = yield prismaClient.prisma.appointment.findMany({
                where: {
                    estado: 'PENDIENTE', // O CONFIRMADO, pero en el problema general no se especifica
                    recordatorioEnviado: false,
                    fechaHora: {
                        gte: now,
                        lte: twentyFourHoursFromNow
                    }
                },
                include: {
                    cliente: true,
                    profesional: true
                }
            });
            for (const appointment of upcomingAppointments) {
                if (appointment.cliente.telefono) {
                    const formattedTime = appointment.fechaHora.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
                    const message = `Hola ${appointment.cliente.nombre} 👋 Te recordamos tu turno con ${appointment.profesional.nombre} mañana a las ${formattedTime} hs.`;
                    yield (0, twilioService.sendWhatsAppReminder)(appointment.cliente.telefono, message);
                    yield prismaClient.prisma.appointment.update({
                        where: { id: appointment.id },
                        data: { recordatorioEnviado: true }
                    });
                }
            }
        }
        catch (error) {
            console.error('Error en el cron job de recordatorios', error);
        }
    }));
};
export { startReminderCron };
