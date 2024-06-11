import { Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { ENV } from '../config/conf';
import jwt from 'jsonwebtoken';
import { AuthRequest, ITokenInfo } from '../interfaces/auth';

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
    req.tokenInfo = tokenInfo;
    next();
  } catch (err) {
    next(err);
  }
};
