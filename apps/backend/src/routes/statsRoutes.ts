// @ts-nocheck
import * as express from 'express';
import * as statsController from '../controllers/statsController';
import * as authMiddleware from '../middlewares/authMiddleware';
const router = (0, express.Router)();
router.get('/', authMiddleware.authenticate, statsController.getStats);
export default router;
