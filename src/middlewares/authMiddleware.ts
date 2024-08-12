import { Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { ENV } from '../config/conf';
import jwt from 'jsonwebtoken';
import { AuthRequest, IAuth, ITokenInfo } from '../interfaces/auth';
import { getAuthByUserId } from '../repositories/authRepository';
import { HttpStatusCode } from '../enums/httpStatusCodes';

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    console.log(req.body)
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return next(new AppError(HttpStatusCode.UNAUTHORIZED, 'You are not authorized'));
    }
    if (ENV.SecretKey === undefined) {
      return next(new AppError(HttpStatusCode.INTERNAL_SERVER_ERROR, 'Something went wrong'));
    }
    const tokenInfo: ITokenInfo = jwt.verify(
      token,
      ENV.SecretKey
    ) as ITokenInfo;
    const auth: IAuth | undefined = await getAuthByUserId(tokenInfo.id);
    if (!auth) {
      return next(new AppError(HttpStatusCode.NOT_FOUND, 'Not Found'));
    }
    const passwordModifiedAtInSecond: number =
      auth.PasswordModifiedAt.getTime() / 1000;
    if (passwordModifiedAtInSecond > tokenInfo.iat) {
      console.log("1 ",passwordModifiedAtInSecond,"2 ", tokenInfo.iat)
      return next(new AppError(HttpStatusCode.UNAUTHORIZED, 'You are not authorized'));
    }
    req.tokenInfo = tokenInfo;
    next();
  } catch (err) {
    next(err);
  }
};
