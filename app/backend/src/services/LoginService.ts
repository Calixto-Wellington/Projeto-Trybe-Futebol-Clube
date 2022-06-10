import * as Bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import UserModel from '../database/models/UserModel';

export default class LoginService {
  static async getByEmail(email: string, password: string) {
    const user = await UserModel.findOne({
      where: { email },
    });

    if (!user) throw new Error('User not found');

    const passwordValidate = await Bcrypt.compare(password, user.password);

    if (!passwordValidate) throw new Error('Password incorrect');

    const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

    const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    const { id, username, role } = user;

    return { user: { id, username, role, email }, token };
  }

  static async getAll() {
    const users = await UserModel.findAll();

    return users;
  }

  static async isLogin(token: string) {
    if (!token) return null;
    interface JwtPayload {
      data: { id: string; email: string };
      id: number
    }

    const decoded = jwt.verify(token, fs.readFileSync('jwt.evaluation.key', 'utf8')) as JwtPayload;

    const users = await this.getAll();

    if (!users) return null;

    const anyUser = users.find((user) => user.email === decoded.data.email);

    return anyUser?.role;
  }
}
