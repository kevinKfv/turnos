// @ts-nocheck
import express_rate_limit from 'express-rate-limit';
// Limitador estricto para rutas de autenticación
exports.authLimiter = (0, express_rate_limit.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5, // Límite de 5 peticiones por IP cada 15 minutos
    message: {
        error: "Demasiados intentos de inicio de sesión desde esta IP, por favor intenta de nuevo en 15 minutos."
    }
});
