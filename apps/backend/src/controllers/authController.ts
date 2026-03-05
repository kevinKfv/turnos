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
exports.login = exports.register = void 0;
import * as prismaClient from '../prismaClient';
import * as bcrypt from '../utils/encryption';
import * as jwt from '../utils/jwt';
import * as client from '@prisma/client';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, email, password, telefono, role } = req.body;
        const existingUser = yield prismaClient.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'El email ya está en uso' });
        }
        const hashedPassword = yield (0, bcrypt.hashPassword)(password);
        // Default to CLIENTE if role is not valid or not provided
        const userRole = Object.values(client.Role).includes(role) ? role : client.Role.CLIENTE;
        const user = yield prismaClient.prisma.user.create({
            data: {
                nombre,
                email,
                password: hashedPassword,
                telefono,
                role: userRole,
            },
        });
        res.status(201).json({ message: 'Usuario registrado exitosamente', userId: user.id });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario' });
    }
});
export { register };
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prismaClient.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const isMatch = yield (0, bcrypt.comparePassword)(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        const token = (0, jwt.generateToken)({ id: user.id, role: user.role });
        res.json({
            token,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                role: user.role,
                telefono: user.telefono,
            }
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
});
export { login };
