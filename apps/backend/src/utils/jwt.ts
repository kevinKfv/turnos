// @ts-nocheck
import jsonwebtoken from 'jsonwebtoken';
const getSecret = () => process.env.JWT_SECRET || 'super_secreto_jwt_development';
const generateToken = (payload) => {
    return jsonwebtoken.sign(payload, getSecret(), { expiresIn: '1d' });
};
export { generateToken };
const verifyToken = (token) => {
    return jsonwebtoken.verify(token, getSecret());
};
export { verifyToken };
