import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user';
import { appError } from '../utils/appError';
import { ENV } from '../config/conf';
import jwt from 'jsonwebtoken';
import { ITokenInfo } from '../interfaces/token';
import { getUserById } from '../repositories/userRepository';
// import * as userService from '../services/userService';

interface UserDataRequest extends Request {
  user?: IUser;
}

export const userProtect = async (
  req: UserDataRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token: string | undefined = req.params.authorised.split(' ')[1];
  if (token === undefined) {
    return next(new appError(401, 'No token provided'));
  }
  if (ENV.SecretKey == undefined) {
    return next(new appError(500, 'Something went wrong'));
  }
  const tokenInfo: ITokenInfo = jwt.verify(token, ENV.SecretKey) as ITokenInfo;
  //   const user: IUser = await userService.getUserById(Number(req.params.id));
  const user: IUser | undefined = await getUserById(Number(req.params.id));

  if (user === undefined) {
    return next(new appError(404, 'No user found'));
  }
  req.user = user;
  next();
};
