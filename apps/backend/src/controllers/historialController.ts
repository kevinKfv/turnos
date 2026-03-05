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
exports.getClientHistorial = exports.addHistorialNote = void 0;
import * as prismaClient from '../prismaClient';
const addHistorialNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user.role !== 'PROFESIONAL' && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'No autorizado' });
        }
        const { notas, clienteId, appointmentId } = req.body;
        const profesionalId = req.user.id;
        const historial = yield prismaClient.prisma.historial.create({
            data: {
                notas,
                clienteId: parseInt(clienteId),
                profesionalId,
                appointmentId: parseInt(appointmentId)
            }
        });
        res.status(201).json(historial);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear historial', details: error.message });
    }
});
export { addHistorialNote };
const getClientHistorial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clienteId } = req.params;
        const { role, id } = req.user;
        if (role === 'CLIENTE' && parseInt(clienteId) !== id) {
            return res.status(403).json({ error: 'No autorizado para ver este historial' });
        }
        const historial = yield prismaClient.prisma.historial.findMany({
            where: { clienteId: parseInt(clienteId) },
            include: {
                profesional: { select: { nombre: true } },
                appointment: { select: { fechaHora: true, estado: true } }
            },
            orderBy: { fecha: 'desc' }
        });
        res.json(historial);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener historial', details: error.message });
    }
});
export { getClientHistorial };
