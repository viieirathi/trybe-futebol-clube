export default interface ILeaderAway {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamAway: {
    teamName: string;
  }
}
