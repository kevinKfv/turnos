// @ts-nocheck
import * as express from 'express';
import * as professionalController from '../controllers/professionalController';
import * as authMiddleware from '../middlewares/authMiddleware';
const router = (0, express.Router)();
router.put('/profile', authMiddleware.authenticate, professionalController.updateProfessionalProfile);
router.get('/:id', authMiddleware.authenticate, professionalController.getProfessionalProfile);
export default router;
