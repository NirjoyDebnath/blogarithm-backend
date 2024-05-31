import { IUser } from '../interfaces/user';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/conf';

export const getToken = async (user: IUser): Promise<string> => {
  const payload = {
    userName: user.UserName,
    name: user.Name,
    role: user.Role
  };
  const token = jwt.sign(payload, ENV.SecretKey || 'hello', {
    expiresIn: '1d'
  });
  return token;
};
