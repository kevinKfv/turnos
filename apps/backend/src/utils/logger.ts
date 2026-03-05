// @ts-nocheck
import pino from 'pino';
// Variables de entorno para decidir el formato del transporte
const isProduction = process.env.NODE_ENV === 'production';
exports.logger = (0, pino.default)({
    level: isProduction ? 'info' : 'debug',
    transport: isProduction
        ? undefined // En producción usamos JSON crudo para recolectores como fluentd/Datadog
        : {
            target: 'pino-pretty', // En local usamos vistas con color y formato legible
            options: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'pid,hostname'
            }
        }
});
