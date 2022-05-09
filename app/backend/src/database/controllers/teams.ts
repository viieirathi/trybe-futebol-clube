import { NextFunction, Request, Response } from 'express';
import teamsAllService from '../services/teams';

const teamsController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const getAllTeams = await teamsAllService();
    return res.status(200).json(getAllTeams);
  } catch (error) {
    next(error);
  }
};

export default teamsController;
