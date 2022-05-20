import serviceLeaderAway from './leaderAway';
import serviceLeaderHome from './leaderHome';

const test = (pontos: number, games: number) => Number(((pontos / (games * 3)) * 100).toFixed(2));

const leaderBoardAll = async () => {
  const getHome = await serviceLeaderHome();
  const getAway = await serviceLeaderAway();
  const getAllLeaderBoards = getHome.filter((h, i) => getAway[i].name === h.name).map((h, i) => (
    { name: h.name,
      totalPoints: h.totalPoints + getAway[i].totalPoints,
      totalGames: h.totalGames + getAway[i].totalGames,
      totalVictories: h.totalVictories + getAway[i].totalVictories,
      totalDraws: h.totalDraws + getAway[i].totalDraws,
      totalLosses: h.totalLosses + getAway[i].totalLosses,
      goalsFavor: h.goalsFavor + getAway[i].goalsFavor,
      goalsOwn: h.goalsOwn + getAway[i].goalsOwn,
      goalsBalance: h.goalsBalance + getAway[i].goalsBalance,
      efficiency: test(
        (h.totalPoints + getAway[i].totalPoints),
        (h.totalGames + getAway[i].totalGames),
      ) }
  ));
  return getAllLeaderBoards;
};

export default leaderBoardAll;
