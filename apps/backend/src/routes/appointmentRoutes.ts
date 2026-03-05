// @ts-nocheck
import * as express from 'express';
import * as appointmentController from '../controllers/appointmentController';
import * as authMiddleware from '../middlewares/authMiddleware';
const router = (0, express.Router)();
router.post('/', authMiddleware.authenticate, appointmentController.createAppointment);
router.get('/', authMiddleware.authenticate, appointmentController.listAppointments);
router.put('/:id/status', authMiddleware.authenticate, appointmentController.updateAppointmentStatus);
router.put('/:id/pay', authMiddleware.authenticate, appointmentController.payAppointment);
router.put('/:id/reschedule', authMiddleware.authenticate, appointmentController.rescheduleAppointment);
router.get('/professionals', authMiddleware.authenticate, appointmentController.getProfessionals);
export default router;
