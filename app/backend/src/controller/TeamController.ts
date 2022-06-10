import { Request, Response, NextFunction } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  static async getAll(_req: Request, res:Response, next: NextFunction) {
    try {
      const teams = await TeamService.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      return next((error));
    }
  }

  static async getById(req: Request, res:Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await TeamService.getById(Number(id));

      return res.status(200).json(team);
    } catch (error) {
      return next(error);
    }
  }
}
