import { Request, Response, NextFunction } from 'express';
import TokenValidate, { SECRET } from '../utils/jwt';

const authenticateLogin = (req: Request, res: Response, next:NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token Invalido' });
    const isValidToken = TokenValidate.verifyToken(token, SECRET);
    req.body = { ...req.body, isValidToken };
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticateLogin;
