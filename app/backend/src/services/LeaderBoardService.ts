import sortArray = require('sort-array');
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

class LeaderBoardService {
  constructor(
    private teams = Team,
    private matches = Match,
  ) { }

  static winsTotal(games: Match[]) {
    const victories = games
      .reduce((acc, cur) => (cur.homeTeamGoals > cur.awayTeamGoals ? acc + 1 : acc), 0);
    return victories;
  }

  static losesTotal(games: Match[]) {
    const loses = games
      .reduce((acc, cur) => (cur.homeTeamGoals < cur.awayTeamGoals ? acc + 1 : acc), 0);
    return loses;
  }

  static tiedTotal(games: Match[]) {
    const tied = games
      .reduce((acc, cur) => (cur.homeTeamGoals === cur.awayTeamGoals ? acc + 1 : acc), 0);
    return tied;
  }

  static favorGoals(games: Match[]) {
    const favor = games
      .reduce((acc, cur) => acc + cur.homeTeamGoals, 0);
    return favor;
  }

  static ownGoals(games: Match[]) {
    const own = games
      .reduce((acc, cur) => acc + cur.awayTeamGoals, 0);
    return own;
  }

  static formatBoard(games: Match[]) {
    const totalVictories = LeaderBoardService.winsTotal(games);
    const totalLosses = LeaderBoardService.losesTotal(games);
    const totalDraws = LeaderBoardService.tiedTotal(games);
    const goalsOwn = LeaderBoardService.ownGoals(games);
    const goalsFavor = LeaderBoardService.favorGoals(games);
    const totalPoints = (totalVictories * 3) + totalDraws;
    const efficiency = +((totalPoints / (games.length * 3)) * 100).toFixed(2);

    return {
      totalPoints,
      totalGames: games.length,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
      goalsBalance: goalsFavor - goalsOwn,
      efficiency,
    };
  }

  boardHome = async () => {
    const getAllTeams = await this.teams.findAll();
    const result = Promise.all(getAllTeams.map(async (t) => {
      const games = await this.matches.findAll({ where: { homeTeam: t.id, inProgress: false } });
      const board = LeaderBoardService.formatBoard(games);
      return {
        name: t.teamName,
        ...board,
      };
    }));
    const keysOrder = ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor', 'goalsOwn'];
    const sort = ['desc', 'desc', 'desc', 'desc', 'desc'];
    return sortArray(await result, { by: keysOrder, order: sort });
  };
}

export default new LeaderBoardService();
