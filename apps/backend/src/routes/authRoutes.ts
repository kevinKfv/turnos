// @ts-nocheck
import * as express from 'express';
import * as authController from '../controllers/authController';
import * as validateRequest from '../middlewares/validateRequest';
import * as authValidator from '../validators/authValidator';
import * as rateLimiter from '../middlewares/rateLimiter';
const router = (0, express.Router)();
router.post('/register', (0, validateRequest.validateRequest)(authValidator.registerSchema), authController.register);
router.post('/login', rateLimiter.authLimiter, (0, validateRequest.validateRequest)(authValidator.loginSchema), authController.login);
export default router;
