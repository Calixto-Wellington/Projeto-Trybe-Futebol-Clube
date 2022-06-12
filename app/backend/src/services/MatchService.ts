import TeamModel from '../database/models/TeamModel';
import MatchModel from '../database/models/MatchModel';

export default class MatchService {
  static async getAll() {
    const match = await MatchModel.findAll({
      include: [
        {
          model: TeamModel,
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
}
