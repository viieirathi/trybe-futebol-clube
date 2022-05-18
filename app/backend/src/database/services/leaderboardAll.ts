// import serviceLeaderAway from './leaderAway';
// import serviceLeaderHome from './leaderHome';

// const leaderBoardAll = async () => {
//   const getHome = await serviceLeaderHome();
//   const getAway = await serviceLeaderAway();
//   const getAllLeaderBoards = getHome.map((h) => getAway.forEach((a) => {
//     if (h.name === a.name) {
//       return { name: h.name,
//         totalPoints: h.totalPoints + a.totalPoints,
//         totalGames: h.totalGames + a.totalGames,
//         totalVictories: h.totalVictories + a.totalVictories,
//         totalDraws: h.totalDraws + a.totalDraws,
//         totalLosses: h.totalLosses + a.totalLosses,
//         goalsFavor: h.goalsFavor + a.goalsFavor,
//         goalsOwn: h.goalsOwn + a.goalsOwn,
//         goalsBalance: h.goalsBalance + a.goalsBalance,
//         efficiency: h.efficiency + a.efficiency,
//       };
//     }
//   }));
//   return getAllLeaderBoards;
// };
// export default leaderBoardAll;

// const leaderBoardAll = async () => {
//   const getHome = await serviceLeaderHome();
//   const getAway = await serviceLeaderAway();
//   const getAllLeaderBoards = getHome.map((h, i) => (getAway[i].name === h.name ? { name: h.name,
//     totalPoints: h.totalPoints + getAway[i].totalPoints,
//     totalGames: h.totalGames + getAway[i].totalGames,
//     totalVictories: h.totalVictories + getAway[i].totalVictories,
//     totalDraws: h.totalDraws + getAway[i].totalDraws,
//     totalLosses: h.totalLosses + getAway[i].totalLosses,
//     goalsFavor: h.goalsFavor + getAway[i].goalsFavor,
//     goalsOwn: h.goalsOwn + getAway[i].goalsOwn,
//     goalsBalance: h.goalsBalance + getAway[i].goalsBalance,
//     efficiency: (h.efficiency + getAway[i].efficiency) / 2,
//   } : null));
//   return getAllLeaderBoards;
// };

// export default leaderBoardAll;
