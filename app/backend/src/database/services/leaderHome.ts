import ILeaderHome from '../interfaces/ILeaderHome';
import Matches from '../models/matches';
import Teams from '../models/teams';

const totalVictories = (getAllMatches: ILeaderHome[]) => {
  let victories = 0;
  getAllMatches.forEach((e) => {
    if (e.homeTeamGoals > e.awayTeamGoals) {
      victories += 1;
    }
  });
  return victories;
};

const totalPoints = (getAllMatches: ILeaderHome[]) => {
  let pointsTotal = 0;
  getAllMatches.forEach((e) => {
    if (e.homeTeamGoals > e.awayTeamGoals) pointsTotal += 3;
    if (e.homeTeamGoals === e.awayTeamGoals) pointsTotal += 1;
  });
  return pointsTotal;
};

const totalLoses = (getAllMatches: ILeaderHome[]) => {
  let loses = 0;
  getAllMatches.forEach((e) => {
    if (e.homeTeamGoals < e.awayTeamGoals) {
      loses += 1;
    }
  });
  return loses;
};

const totalDraw = (getAllMatches: ILeaderHome[]) => {
  let draws = 0;
  getAllMatches.forEach((e) => {
    if (e.homeTeamGoals === e.awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
};

const goalsFavor = (getAllMatches: ILeaderHome[]) => {
  let goals = 0;
  getAllMatches.forEach((e) => {
    if (e.homeTeamGoals) {
      goals += e.homeTeamGoals;
    }
  });
  return goals;
};

const goalsOwn = (getAllMatches: ILeaderHome[]) => {
  let goalsOwns = 0;
  getAllMatches.forEach((e) => {
    if (e.awayTeamGoals) {
      goalsOwns += e.awayTeamGoals;
    }
  });
  return goalsOwns;
};

const goalsBalance = (getAllMatches: ILeaderHome[]) => {
  const getGoals = goalsFavor(getAllMatches);
  const getGoalsOwn = goalsOwn(getAllMatches);
  const balanceGols = getGoals - getGoalsOwn;
  return balanceGols;
};

const efficiencyTeams = (getAllMatches: ILeaderHome[]) => {
  const cem = 100;
  const totalEff = totalPoints(getAllMatches);
  const lengthMatches = getAllMatches.length * 3;
  const effT = totalEff / lengthMatches;
  return Number((effT * cem).toFixed(2));
};

const getAllTeamsLeaderHome = async () => {
  const getAllTeams = await Teams.findAll();
  return getAllTeams;
};

const getAllMatchesHome = async () => {
  const getAllMatches = await Matches.findAll({
    where: { inProgress: false },
    include: [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
    ],
  }) as unknown as ILeaderHome[];
  return getAllMatches;
};

const serviceLeaderHome = async () => {
  const teamsHome = await getAllTeamsLeaderHome();
  const getHome = await getAllMatchesHome();
  const getTeamsName = teamsHome.map((e) => {
    const getAllHome = getHome.filter((h) => h.teamHome.teamName === e.teamName);
    return { name: e.teamName,
      totalPoints: totalPoints(getAllHome),
      totalGames: getAllHome.length,
      totalVictories: totalVictories(getAllHome),
      totalDraws: totalDraw(getAllHome),
      totalLosses: totalLoses(getAllHome),
      goalsFavor: goalsFavor(getAllHome),
      goalsOwn: goalsOwn(getAllHome),
      goalsBalance: goalsBalance(getAllHome),
      efficiency: efficiencyTeams(getAllHome),
    };
  });
  return getTeamsName;
};

export default serviceLeaderHome;
