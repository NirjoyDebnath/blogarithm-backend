import { IUser } from '../interfaces/user';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/conf';
import { IPayload, ITokenInfo } from '../interfaces/token';
import { appError } from './appError';

export const getTokenInfoFromToken = async (
  decodedToken: string | jwt.JwtPayload
): Promise<ITokenInfo> => {
  const tokenInfo = decodedToken as ITokenInfo;
  return tokenInfo;
};

export const getToken = async (user: IUser): Promise<string> => {
  if (ENV.SecretKey == undefined) {
    throw new appError(500, 'Something went wrong');
  }
  const payload: IPayload = {
    userName: user.UserName,
    name: user.Name,
    role: user.Role
  };
  const token =
    'Bearer ' +
    jwt.sign(payload, ENV.SecretKey, {
      expiresIn: ENV.JwtTokenExpire || '2d'
    });
  return token;
};

export const verifyToken = async (
  token: string | undefined
): Promise<ITokenInfo> => {
  if (!token) {
    throw new appError(401, 'No token provided');
  }
  if (ENV.SecretKey == undefined) {
    throw new appError(500, 'Something went wrong');
  }
  token = token.split(' ')[1];
  const decodedToken = jwt.verify(token, ENV.SecretKey);
  const tokenInfo = getTokenInfoFromToken(decodedToken);
  return tokenInfo;
};