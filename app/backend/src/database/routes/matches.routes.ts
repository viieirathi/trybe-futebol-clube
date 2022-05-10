import { Router } from 'express';
import matchesAllController from '../controllers/matches';

const matchesRouter:Router = Router();
matchesRouter.get('/', matchesAllController);

export default matchesRouter;
