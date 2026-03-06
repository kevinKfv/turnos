// @ts-nocheck
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import express_rate_limit from 'express-rate-limit';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
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
            nodeProfilingIntegration(),
        ],
        tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
        profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
    });
}
// Trust proxy is needed for express-rate-limit behind Railway
app.set('trust proxy', 1);

// 1. Seguridad de Cabeceras HTTP
app.use(helmet());
// Sentry Request Handler (Debe ser el primer middleware después de la seguridad base y antes del body parser)
if (process.env.SENTRY_DSN) {
    Sentry.setupExpressErrorHandler(app);
}
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://frontend-production-9715.up.railway.app',
    'http://localhost:5173',
    'http://localhost:3000'
].filter(Boolean).map(url => url?.replace(/\/$/, '')); // Remove trailing slashes

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Remove trailing slash from incoming origin just in case
        const cleanOrigin = origin.replace(/\/$/, '');

        if (allowedOrigins.indexOf(cleanOrigin) !== -1 || allowedOrigins.some(ao => cleanOrigin.includes(ao as string))) {
            callback(null, true);
        } else {
            console.error(`CORS Blocked: ${origin}`);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
    credentials: true,
}));

// Preflight explícito para todas las rutas
app.options('*', cors());
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
