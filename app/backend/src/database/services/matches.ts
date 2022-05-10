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

export default matchesAllService;
