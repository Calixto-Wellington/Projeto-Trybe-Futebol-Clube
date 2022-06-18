import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';
import LoginService from './LoginService';
import { ICreate } from '../interfaces/IMatch';

export default class MatchService {
  static async getAll() {
    const matches = await MatchModel.findAll({
      include: [{ model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'],
        } },
      { model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'],
        } },
      ],
    });
    return matches;
  }

  static async getAllParams(params: boolean) {
    const match = await MatchModel.findAll({
      where: { inProgress: params },
      include: [{ model: TeamModel,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      },
      {
        model: TeamModel,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
      ],
    });
    return match;
  }

  static async getAllLala() {
    const match1 = await MatchModel.findAll({
      include: [
        { model: TeamModel,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        {
          model: TeamModel,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    return match1;
  }

  static async createMatch(token: string, body: ICreate) {
    const tokenVerify = await LoginService.isLogin(token);

    if (!tokenVerify) return null;

    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = body;
    const matchNew = MatchModel.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    });

    return matchNew;
  }

  static async getById(homeTeam: number, awayTeam: number) {
    const teamHome = await TeamModel.findByPk(homeTeam);
    const teamAway = await TeamModel.findByPk(awayTeam);

    if (!teamHome || !teamAway) return true;
  }

  static async updateMach(id: number) {
    const matchFinish = await MatchModel.update(
      {
        inProgress: false },
      { where: { id } },
    );
    return matchFinish;
  }

  static async goalsUpdate(homeTeamGoals:number, awayTeamGoals:number, id:number) {
    await MatchModel.update({
      homeTeamGoals,
      awayTeamGoals,
    }, {
      where: { id },
    });
  }
}
