import { Request, Response, NextFunction } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const match = await MatchService.getAll();
      return res.status(200).json(match);
    } catch (error) {
      return next(error);
    }
  }
}
