import { Router } from 'express';
import leaderboardHome from '../controllers/leaderHome';

const leaderHome:Router = Router();
leaderHome.get('/home', leaderboardHome);

export default leaderHome;
