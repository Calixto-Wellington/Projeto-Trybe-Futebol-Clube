import { Request, Response, NextFunction } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const partidas = await LeaderBoardService.boardHome();

      return res.status(200).json(partidas);
    } catch (error) {
      return next(error);
    }
  }
}
