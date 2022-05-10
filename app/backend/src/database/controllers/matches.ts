import { NextFunction, Request, Response } from 'express';
import matchesAllService from '../services/matches';

const matchesAllController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const getMatchesAll = await matchesAllService();
    return res.status(200).json(getMatchesAll);
  } catch (error) {
    next(error);
  }
};

export default matchesAllController;
