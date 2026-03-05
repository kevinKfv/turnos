// @ts-nocheck
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import express_rate_limit from 'express-rate-limit';
const Sentry = __importStar(require("@sentry/node"));
import * as profiling_node from '@sentry/profiling-node';
import * as errorHandler from './middlewares/errorHandler';
import authRoutes from './routes/authRoutes';
import appointmentRoutes from './routes/appointmentRoutes';
import professionalRoutes from './routes/professionalRoutes';
import historialRoutes from './routes/historialRoutes';
import statsRoutes from './routes/statsRoutes';
const app = express();
if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
            (0, profiling_node.nodeProfilingIntegration)(),
        ],
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
        profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
    });
}
// 1. Seguridad de Cabeceras HTTP
app.use(helmet());
// Sentry Request Handler (Debe ser el primer middleware después de la seguridad base y antes del body parser)
if (process.env.SENTRY_DSN) {
    Sentry.setupExpressErrorHandler(app);
}
// 2. Configuración Estricta de CORS
const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://turnospro.com', 'https://www.turnospro.com', process.env.VITE_API_URL || '', 'http://localhost']
    : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost'];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
}));
// 3. Rate Limiting Global
const limiter = express_rate_limit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Límite de 100 peticiones por IP cada 15 minutos
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.'
});
app.use(limiter);
app.use(express.json());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/stats', statsRoutes);
app.use(errorHandler.errorHandler);
export default app;
