import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { inProgress } = req.query;
      const progressInConvert = inProgress === 'true';
      if (inProgress) {
        const match = await MatchService.getAll(progressInConvert);
        return res.status(200).json(match);
      }
      const match = await MatchService.getAllLala();
      return res.status(200).json(match);
    } catch (error) {
      return next(error);
    }
  }

  static async matchCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const { awayTeam, homeTeam } = req.body;
      if (awayTeam === homeTeam) {
        return res.status(401)
          .json({ message: 'It is not possible to create a match with two equal teams' });
      }
      const { authorization } = req.headers;
      const matchNew = await MatchService.createMatch(authorization as string, req.body);

      const teamIsExist = await MatchService
        .getById(matchNew?.homeTeam as number, matchNew?.awayTeam as number);

      if (teamIsExist) {
        return res.status(404).json({ message: 'There is no team with such id!' });
      }

      return res.status(201).json(matchNew);
    } catch (error) {
      return next(error);
    }
  }

  static async matchUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MatchService.updateMach(Number(id));

      return res.status(200).json({ message: 'Finish' });
    } catch (error) {
      return next(error);
    }
  }
}
