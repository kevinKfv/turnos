// @ts-nocheck
import * as jwt from '../utils/jwt';
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
        return res.status(401).json({ error: 'Token no proporcionado o inválido' });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = (0, jwt.verifyToken)(token);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
};
export { authenticate };
