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
exports.getProfessionals = exports.listAppointments = exports.rescheduleAppointment = exports.payAppointment = exports.updateAppointmentStatus = exports.createAppointment = void 0;
import * as prismaClient from '../prismaClient';
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fechaHora, profesionalId } = req.body;
        const clienteId = req.user.id;
        const appointmentDate = new Date(fechaHora);
        const professional = yield prismaClient.prisma.user.findUnique({
            where: { id: parseInt(profesionalId) }
        });
        if (!professional || professional.role !== 'PROFESIONAL') {
            return res.status(404).json({ error: 'Profesional no encontrado' });
        }
        // Validación de días y horarios
        const dayOfWeek = appointmentDate.getDay(); // 0: Domingo, 1: Lunes, etc.
        const timeString = `${appointmentDate.getHours().toString().padStart(2, '0')}:${appointmentDate.getMinutes().toString().padStart(2, '0')}`;
        if (professional.diasLaborables && !professional.diasLaborables.split(',').includes(dayOfWeek.toString())) {
            return res.status(400).json({ error: 'El profesional no atiende en este día de la semana' });
        }
        if (professional.horaInicio && professional.horaFin) {
            if (timeString < professional.horaInicio || timeString > professional.horaFin) {
                return res.status(400).json({ error: `El profesional solo atiende entre las ${professional.horaInicio} y las ${professional.horaFin}` });
            }
        }
        // Validación de doble reserva (profesional ocupado en ese horario)
        // Se asume un margen de 30 minutos para el turno
        const turnoFinDate = new Date(appointmentDate.getTime() + 30 * 60000);
        // Verifica si la fechaHora del nuevo turno cae dentro de un turno existente (suponiendo todos duran 30 min) o empieza a la misma hora
        const existingAppointment = yield prismaClient.prisma.appointment.findFirst({
            where: {
                profesionalId,
                estado: { not: 'CANCELADO' },
                fechaHora: appointmentDate
            }
        });
        if (existingAppointment) {
            return res.status(400).json({ error: 'El profesional ya tiene un turno reservado en ese horario exacto' });
        }
        const appointment = yield prismaClient.prisma.appointment.create({
            data: {
                fechaHora: appointmentDate,
                clienteId,
                profesionalId: parseInt(profesionalId),
                precio: professional.precioConsulta || 0,
                pagado: false
            },
            include: {
                profesional: { select: { nombre: true } },
                cliente: { select: { nombre: true, telefono: true } }
            }
        });
        res.status(201).json(appointment);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear turno', details: error.message });
    }
});
export { createAppointment };
const updateAppointmentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { estado } = req.body; // PENDIENTE, CONFIRMADO, CANCELADO
        const appointment = yield prismaClient.prisma.appointment.update({
            where: { id: parseInt(id) },
            data: { estado }
        });
        res.json(appointment);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar turno' });
    }
});
export { updateAppointmentStatus };
const payAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { role, id: userId } = req.user;
        const appointment = yield prismaClient.prisma.appointment.findUnique({
            where: { id: parseInt(id) }
        });
        if (!appointment)
            return res.status(404).json({ error: 'Turno no encontrado' });
        if (role === 'CLIENTE' && appointment.clienteId !== userId)
            return res.status(403).json({ error: 'No autorizado' });
        const updated = yield prismaClient.prisma.appointment.update({
            where: { id: parseInt(id) },
            data: { pagado: true, estado: 'CONFIRMADO' }
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al procesar pago simulado' });
    }
});
export { payAppointment };
const rescheduleAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nuevaFechaHora } = req.body;
        const { role, id: userId } = req.user;
        const appointmentDate = new Date(nuevaFechaHora);
        const appointment = yield prismaClient.prisma.appointment.findUnique({
            where: { id: parseInt(id) },
            include: { profesional: true }
        });
        if (!appointment)
            return res.status(404).json({ error: 'Turno no encontrado' });
        if (role === 'CLIENTE' && appointment.clienteId !== userId)
            return res.status(403).json({ error: 'No autorizado' });
        const professional = appointment.profesional;
        // Validación de disponibilidad
        const dayOfWeek = appointmentDate.getDay();
        const timeString = `${appointmentDate.getHours().toString().padStart(2, '0')}:${appointmentDate.getMinutes().toString().padStart(2, '0')}`;
        if (professional.diasLaborables && !professional.diasLaborables.split(',').includes(dayOfWeek.toString())) {
            return res.status(400).json({ error: 'El profesional no atiende en este día de la semana' });
        }
        if (professional.horaInicio && professional.horaFin) {
            if (timeString < professional.horaInicio || timeString > professional.horaFin) {
                return res.status(400).json({ error: `El profesional solo atiende entre las ${professional.horaInicio} y las ${professional.horaFin}` });
            }
        }
        const existingAppointment = yield prismaClient.prisma.appointment.findFirst({
            where: {
                profesionalId: appointment.profesionalId,
                estado: { not: 'CANCELADO' },
                fechaHora: appointmentDate,
                id: { not: parseInt(id) }
            }
        });
        if (existingAppointment) {
            return res.status(400).json({ error: 'El profesional ya tiene un turno reservado en ese horario exacto' });
        }
        const updated = yield prismaClient.prisma.appointment.update({
            where: { id: parseInt(id) },
            data: { fechaHora: appointmentDate }
        });
        res.json(updated);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al reprogramar turno', details: error.message });
    }
});
export { rescheduleAppointment };
const listAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { role, id } = req.user;
        let whereCondition = {};
        if (role === 'CLIENTE') {
            whereCondition.clienteId = id;
        }
        else if (role === 'PROFESIONAL') {
            whereCondition.profesionalId = id;
        }
        const appointments = yield prismaClient.prisma.appointment.findMany({
            where: whereCondition,
            include: {
                cliente: { select: { nombre: true, email: true, telefono: true } },
                profesional: { select: { nombre: true, email: true } }
            },
            orderBy: { fechaHora: 'asc' }
        });
        res.json(appointments);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al listar turnos' });
    }
});
export { listAppointments };
const getProfessionals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const professionals = yield prismaClient.prisma.user.findMany({
            where: { role: 'PROFESIONAL' },
            select: { id: true, nombre: true, email: true, telefono: true }
        });
        res.json(professionals);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener profesionales' });
    }
});
export { getProfessionals };
