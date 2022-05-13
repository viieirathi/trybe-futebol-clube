import { Router } from 'express';
import matchesAllController, {
  matchesCreateController, matchesFinishController,
  matchesUpdateController } from '../controllers/matches';
import authenticateLogin from '../middlewares/auth';

const matchesRouter:Router = Router();
matchesRouter.get('/', matchesAllController);
matchesRouter.post('/', authenticateLogin, matchesCreateController);
matchesRouter.patch('/:id', matchesUpdateController);
matchesRouter.patch('/:id/finish', matchesFinishController);

export default matchesRouter;
