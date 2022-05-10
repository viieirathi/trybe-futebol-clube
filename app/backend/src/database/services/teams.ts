import Teams from '../models/teams';

const teamsAllService = async () => {
  const getTeamsAll = await Teams.findAll();
  return getTeamsAll;
};

export const teamsIdService = async (id: string) => {
  const getTeamsId = await Teams.findOne({ where: { id } });
  return getTeamsId;
};

export default teamsAllService;
