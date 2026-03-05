// @ts-nocheck
import * as express from 'express';
import * as historialController from '../controllers/historialController';
import * as authMiddleware from '../middlewares/authMiddleware';
const router = (0, express.Router)();
router.post('/', authMiddleware.authenticate, historialController.addHistorialNote);
router.get('/cliente/:clienteId', authMiddleware.authenticate, historialController.getClientHistorial);
export default router;
