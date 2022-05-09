import Teams from '../models/teams';

const teamsAllService = async () => {
  const getTeamsAll = await Teams.findAll();
  return getTeamsAll;
};

export default teamsAllService;
