import { Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { ENV } from '../config/conf';
import jwt from 'jsonwebtoken';
import { AuthRequest, IAuth, ITokenInfo } from '../interfaces/auth';
import { getAuthByUserId } from '../repositories/authRepository';

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(new AppError(401, 'User not logged in'));
    }
    if (ENV.SecretKey === undefined) {
      return next(new AppError(500, 'Something went wrong'));
    }
    const tokenInfo: ITokenInfo = jwt.verify(
      token,
      ENV.SecretKey
    ) as ITokenInfo;
    const auth: IAuth | undefined = await getAuthByUserId(tokenInfo.id);
    if (!auth) {
      return next(new AppError(400, 'User doesnot exist'));
    }
    const passwordModifiedAtInSecond: number =
      auth.PasswordModifiedAt.getTime() / 1000;
    if (passwordModifiedAtInSecond > tokenInfo.iat) {
      return next(new AppError(401, 'You are not authorized'));
    }
    req.tokenInfo = tokenInfo;
    next();
  } catch (err) {
    next(err);
  }
};
