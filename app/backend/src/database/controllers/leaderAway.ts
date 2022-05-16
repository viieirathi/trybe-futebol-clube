import { NextFunction, Request, Response } from 'express';
import getTeamsLeaderAway from '../services/leaderAway';

const leaderboardAway = async (_req: Request, res: Response, _next: NextFunction) => {
  const getLeaderAway = await getTeamsLeaderAway();
  const sortLeaderAway = getLeaderAway.sort((a, b) => (
    b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn
  ));
  return res.status(200).json(sortLeaderAway);
};

export default leaderboardAway;
