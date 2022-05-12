import IMatches from '../interfaces/IMatches';
import Matches from '../models/matches';
import Teams from '../models/teams';

const matchesAllService = async () => {
  const getMatchesAll = await Matches.findAll({
    include: [
      { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  });
  return getMatchesAll;
};

export const matchesCreate = async (matches: IMatches) => {
  const createMatches = await Matches.create(matches);
  return createMatches;
};

export const matchesFinishService = async (id: string) => {
  await Matches.update({ inProgress: false }, { where: { id } });
};

export const matchesFindTeams = async (homeTeam: string, awayTeam: string) => {
  const getFindTeamHome = await Matches.findOne({ where: { homeTeam } });
  const getFindAwayTeam = await Matches.findOne({ where: { awayTeam } });
  const findTeams = getFindTeamHome && getFindAwayTeam;
  return findTeams;
};

export default matchesAllService;
