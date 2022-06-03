import { Request, Response, NextFunction } from 'express';
import { ILogin } from '../interfaces/ILogin';
import LoginService from '../services/LoginService';

export default class LoginController {
  static async login(req: Request, res:Response, next:NextFunction) {
    try {
      const { email, password } = req.body as ILogin;

      const result = await LoginService.getByEmail({ email, password });

      if (!result) {
        return next(({ type: 'unauthorized',
          message: 'Incorrect email or password' }
        ));
      }

      return res.status(200).json({ ...result });
    } catch (error) {
      return res.status(401).json({ message: 'error' });
    }
  }
}
