import { IUser } from '../interfaces/user';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/conf';
import { IPayload, ITokenInfo } from '../interfaces/auth';
import { AppError } from './appError';
import { HttpStatusCode } from '../enums/httpStatusCodes';

export const getToken = async (user: IUser): Promise<string> => {
  if (ENV.SecretKey == undefined) {
    throw new AppError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }
  const payload: IPayload = {
    id: user.Id,
    userName: user.UserName,
    name: user.Name,
    role: user.Role
  };
  const token = jwt.sign(payload, ENV.SecretKey, {
    expiresIn: ENV.JwtTokenExpire || '2d'
  });
  return token;
};

export const verifyToken = async (
  token: string | undefined
): Promise<ITokenInfo> => {
  if (!token) {
    throw new AppError(HttpStatusCode.UNAUTHORIZED, 'You are not authorized');
  }
  if (ENV.SecretKey == undefined) {
    throw new AppError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Something went wrong');
  }
  token = token.split(' ')[1];
  const decodedToken = jwt.verify(token, ENV.SecretKey);
  const tokenInfo = decodedToken as ITokenInfo;
  return tokenInfo;
};
