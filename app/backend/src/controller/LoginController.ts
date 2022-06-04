import { Request, Response, NextFunction } from 'express';
import { ILogin, IToken } from '../interfaces/ILogin';
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
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
  }

  static async roleUser(req: Request, res:Response) {
    try {
      const { authorization } = req.headers;
      const loggedUser = await LoginService.isLogin(authorization as string);
      if (!loggedUser) return res.status(401).json({ message: 'Token does not exist' });
      return res.status(200).json(loggedUser);
    } catch (error) {
      return res.status(401).json({ message: 'Token Incorrect' });
    }
  }
}
