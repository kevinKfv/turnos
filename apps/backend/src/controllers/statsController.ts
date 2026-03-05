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
exports.getStats = void 0;
import * as prismaClient from '../prismaClient';
const getStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'Solo los administradores pueden ver estadísticas' });
        }
        // Cantidad de turnos por estado
        const estadoStats = yield prismaClient.prisma.appointment.groupBy({
            by: ['estado'],
            _count: {
                _all: true
            }
        });
        // Ingresos totales (turnos confirmados y pagados)
        const ingresosResult = yield prismaClient.prisma.appointment.aggregate({
            where: { pagado: true },
            _sum: { precio: true }
        });
        // Turnos por profesional
        const profesionalStats = yield prismaClient.prisma.appointment.groupBy({
            by: ['profesionalId'],
            _count: { _all: true }
        });
        const usersCount = yield prismaClient.prisma.user.groupBy({
            by: ['role'],
            _count: { _all: true }
        });
        res.json({
            estadoTurnos: estadoStats,
            ingresosPagados: ingresosResult._sum.precio || 0,
            turnosPorProfesional: profesionalStats,
            usuarios: usersCount
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener estadísticas', details: error.message });
    }
});
export { getStats };
