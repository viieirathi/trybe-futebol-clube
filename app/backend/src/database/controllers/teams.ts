import { NextFunction, Request, Response } from 'express';
import teamsAllService, { teamsIdService } from '../services/teams';

const teamsAllController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const getAllTeams = await teamsAllService();
    return res.status(200).json(getAllTeams);
  } catch (error) {
    next(error);
  }
};

export const teamsIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const getIdTeams = await teamsIdService(id);
    return res.status(200).json(getIdTeams);
  } catch (error) {
    next(error);
  }
};

export default teamsAllController;
