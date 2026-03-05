// @ts-nocheck
import * as logger from '../utils/logger';
const errorHandler = (err, req, res, next) => {
    // Generar logs en consola de alto nivel
    logger.logger.error(`[GlobalError] ${req.method} ${req.url}: ${err.message}`);
    // Si la request tenía un body con información sensible (como contraseñas) o no
    if (Object.keys(req.body).length > 0) {
        logger.logger.debug({ payload: Object.assign(Object.assign({}, req.body), { password: req.body.password ? '***' : undefined }) }, "Detalles del request que falló");
    }
    if (err.stack) {
        logger.logger.debug(err.stack); // El stacktrace solo se loguea detalladamente en consola pero NO se envía al cliente en Production
    }
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    // Si estamos en producción no pasamos el stack nativo al usuario.
    res.status(status).json({
        error: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};
export { errorHandler };
