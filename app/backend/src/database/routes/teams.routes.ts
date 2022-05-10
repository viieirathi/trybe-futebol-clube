import { Router } from 'express';
import teamsAllController, { teamsIdController } from '../controllers/teams';

const teamsRouter:Router = Router();
teamsRouter.get('/', teamsAllController);
teamsRouter.get('/:id', teamsIdController);

export default teamsRouter;
