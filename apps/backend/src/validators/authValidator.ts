// @ts-nocheck
import * as zod from 'zod';
exports.registerSchema = zod.z.object({
    body: zod.z.object({
        nombre: zod.z.string().min(2, { message: "Mínimo 2 caracteres" }),
        email: zod.z.string().email({ message: "Formato de email inválido" }),
        password: zod.z.string()
            .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
        role: zod.z.enum(['ADMIN', 'PROFESIONAL', 'CLIENTE']).optional(),
        telefono: zod.z.string().optional()
    })
});
exports.loginSchema = zod.z.object({
    body: zod.z.object({
        email: zod.z.string().email({ message: "Formato de email inválido" }),
        password: zod.z.string().min(1, { message: "La contraseña no puede estar vacía" })
    })
});
