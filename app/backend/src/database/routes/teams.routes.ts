import { Router } from 'express';
import teamsController from '../controllers/teams';

const teamsRouter:Router = Router();
teamsRouter.get('/', teamsController);

export default teamsRouter;
