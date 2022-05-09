import { NextFunction, Request, Response } from 'express';
// import Users from '../models/users';
import loginExist from '../services/login';

const loginControllers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { code, data } = await loginExist({ email, password });
    return res.status(code).json(data);
  } catch (error) {
    next(error);
  }
};

export const getRole = async (req: Request, res: Response, _next: NextFunction) => {
  const { isValidToken: { role } } = req.body;
  return res.status(200).json(role);
};

export default loginControllers;
