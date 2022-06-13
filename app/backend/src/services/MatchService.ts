import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

export default class MatchService {
  static async getAll(params: boolean) {
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
  // this.getAllLala();

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
}
