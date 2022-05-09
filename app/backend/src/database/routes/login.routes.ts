import { Router } from 'express';
import isValid from '../middlewares/validateLogin';
import loginControllers, { getRole } from '../controllers/login';
import authenticateLogin from '../middlewares/auth';

const loginRouter:Router = Router();
loginRouter.post('/', isValid, loginControllers);
loginRouter.get('/validate', authenticateLogin, getRole);

export default loginRouter;
