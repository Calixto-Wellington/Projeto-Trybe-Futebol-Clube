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
}
