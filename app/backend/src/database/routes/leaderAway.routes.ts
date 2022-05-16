import { Router } from 'express';
import leaderboardAway from '../controllers/leaderAway';

const leaderAway:Router = Router();
leaderAway.get('/away', leaderboardAway);

export default leaderAway;
