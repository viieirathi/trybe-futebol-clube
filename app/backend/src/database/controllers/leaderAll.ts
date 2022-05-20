import { NextFunction, Request, Response } from 'express';
import leaderBoardAll from '../services/leaderboardAll';

const leaderAllController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getAllLeaderboard = await leaderBoardAll();
    const sortLeaderAll = getAllLeaderboard.sort((a, b) => (
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn
    ));
    res.status(200).json(sortLeaderAll);
  } catch (error) {
    next(error);
  }
};

export default leaderAllController;
