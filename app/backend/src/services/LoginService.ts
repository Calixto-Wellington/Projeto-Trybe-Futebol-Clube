import * as Bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';
import * as fs from 'fs';
import UserModel from '../database/models/UserModel';
import { ILogin } from '../interfaces/ILogin';

export default class UserService {
  static async getByEmail({ email, password }: ILogin) {
    const user = await UserModel.findOne({
      where: { email },
    });
    if (!user) throw new Error('User not found');

    if (!Bcrypt.compare(password, user.password)) throw new Error('Password incorrect');

    const jwtConfig: SignOptions = { expiresIn: '7d', algorithm: 'HS256' };

    const secret = fs.readFileSync('jwt.evaluation.key', 'utf8');

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    const { id, username, role } = user;

    return { user: { id, username, role, email }, token };
  }
}
