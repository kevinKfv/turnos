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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.getProfessionalProfile = exports.updateProfessionalProfile = void 0;
import * as prismaClient from '../prismaClient';
const updateProfessionalProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.user.role !== 'PROFESIONAL' && req.user.role !== 'ADMIN') {
            return res.status(403).json({ error: 'No autorizado' });
        }
        const idToUpdate = req.user.role === 'ADMIN' && req.body.id ? req.body.id : req.user.id;
        const { precioConsulta, diasLaborables, horaInicio, horaFin } = req.body;
        const updatedUser = yield prismaClient.prisma.user.update({
            where: { id: parseInt(idToUpdate) },
            data: {
                precioConsulta: precioConsulta ? parseFloat(precioConsulta) : null,
                diasLaborables,
                horaInicio,
                horaFin
            }
        });
        // Ocultar contraseña
        const { password } = updatedUser, userWithoutPassword = __rest(updatedUser, ["password"]);
        res.json(userWithoutPassword);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar perfil profesional', details: error.message });
    }
});
export { updateProfessionalProfile };
const getProfessionalProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield prismaClient.prisma.user.findUnique({
            where: { id: parseInt(id) }
        });
        if (!user || user.role !== 'PROFESIONAL') {
            return res.status(404).json({ error: 'Profesional no encontrado' });
        }
        const { password } = user, userWithoutPassword = __rest(user, ["password"]);
        res.json(userWithoutPassword);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener perfil profesional', details: error.message });
    }
});
export { getProfessionalProfile };
