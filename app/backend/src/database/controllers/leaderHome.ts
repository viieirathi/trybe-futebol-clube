import { NextFunction, Request, Response } from 'express';
import getTeamsLeaderHome from '../services/leaderHome';

const leaderboardHome = async (_req: Request, res: Response, _next: NextFunction) => {
  const getLeaderHome = await getTeamsLeaderHome();
  const sortLeaderHome = getLeaderHome.sort((a, b) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn
  ));
  return res.status(200).json(sortLeaderHome);
};

export default leaderboardHome;
