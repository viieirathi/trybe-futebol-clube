import ILeaderAway from '../interfaces/ILeaderAway';
import Matches from '../models/matches';
import Teams from '../models/teams';

const totalVictories = (getAllMatches: ILeaderAway[]) => {
  let victories = 0;
  getAllMatches.forEach((e) => {
    if (e.homeTeamGoals < e.awayTeamGoals) {
      victories += 1;
    }
  });
  return victories;
};

const totalPoints = (getAllMatches: ILeaderAway[]) => {
  let pointsTotal = 0;
  getAllMatches.forEach((e) => {
    if (e.homeTeamGoals < e.awayTeamGoals) pointsTotal += 3;
    if (e.homeTeamGoals === e.awayTeamGoals) pointsTotal += 1;
  });
  return pointsTotal;
};

const totalLoses = (getAllMatches: ILeaderAway[]) => {
  let loses = 0;
  getAllMatches.forEach((e) => {
    if (e.homeTeamGoals > e.awayTeamGoals) {
      loses += 1;
    }
  });
  return loses;
};

const totalDraw = (getAllMatches: ILeaderAway[]) => {
  let draws = 0;
  getAllMatches.forEach((e) => {
    if (e.homeTeamGoals === e.awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
};

const goalsFavor = (getAllMatches: ILeaderAway[]) => {
  let goals = 0;
  getAllMatches.forEach((e) => {
    if (e.awayTeamGoals) {
      goals += e.awayTeamGoals;
    }
  });
  return goals;
};

const goalsOwn = (getAllMatches: ILeaderAway[]) => {
  let goalsOwns = 0;
  getAllMatches.forEach((e) => {
    if (e.homeTeamGoals) {
      goalsOwns += e.homeTeamGoals;
    }
  });
  return goalsOwns;
};

const goalsBalance = (getAllMatches: ILeaderAway[]) => {
  const getGoals = goalsFavor(getAllMatches);
  const getGoalsOwn = goalsOwn(getAllMatches);
  const balanceGols = getGoals - getGoalsOwn;
  return balanceGols;
};

const efficiencyTeams = (getAllMatches: ILeaderAway[]) => {
  const cem = 100;
  const totalEff = totalPoints(getAllMatches);
  const lengthMatches = getAllMatches.length * 3;
  const effT = totalEff / lengthMatches;
  return Number((effT * cem).toFixed(2));
};

const getAllTeamsLeaderAway = async () => {
  const getAllTeams = await Teams.findAll();
  return getAllTeams;
};

const getAllMatchesAway = async () => {
  const getAllMatches = await Matches.findAll({
    where: { inProgress: false },
    include: [{ model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
  }) as unknown as ILeaderAway[];
  return getAllMatches;
};

const serviceLeaderAway = async () => {
  const teamsAway = await getAllTeamsLeaderAway();
  const getAway = await getAllMatchesAway();
  const getTeamsName = teamsAway.map((e) => {
    const getAllAway = getAway.filter((h) => h.teamAway.teamName === e.teamName);
    return { name: e.teamName,
      totalPoints: totalPoints(getAllAway),
      totalGames: getAllAway.length,
      totalVictories: totalVictories(getAllAway),
      totalDraws: totalDraw(getAllAway),
      totalLosses: totalLoses(getAllAway),
      goalsFavor: goalsFavor(getAllAway),
      goalsOwn: goalsOwn(getAllAway),
      goalsBalance: goalsBalance(getAllAway),
      efficiency: efficiencyTeams(getAllAway),
    };
  });
  return getTeamsName;
};

export default serviceLeaderAway;
