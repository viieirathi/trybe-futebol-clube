import { NextFunction, Request, Response } from 'express';
import matchesAllService, {
  matchesCreate,
  matchesFindTeams,
  matchesFinishService,
  matchesFindUpId } from '../services/matches';

const matchesAllController = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const getMatchesAll = await matchesAllService();
    return res.status(200).json(getMatchesAll);
  } catch (error) {
    next(error);
  }
};

export const matchesCreateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;
    if (homeTeam === awayTeam) {
      return res.status(401).json({
        message: 'It is not possible to create a match with two equal teams' });
    }
    const findTeams = await matchesFindTeams(homeTeam, awayTeam);
    if (!findTeams) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    const createMatches = await matchesCreate({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
    const { id } = createMatches;
    return res.status(201).json({
      id, homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });
  } catch (error) {
    next(error);
  }
};

export const matchesFinishController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await matchesFinishService(id);
    return res.status(200).json({ message: 'Finish Matche' });
  } catch (error) {
    next(error);
  }
};

export const matchesUpdateController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await matchesFindUpId(homeTeamGoals, awayTeamGoals, id);
    return res.status(200).json({ message: 'Update goals' });
  } catch (error) {
    next(error);
  }
};

export default matchesAllController;
