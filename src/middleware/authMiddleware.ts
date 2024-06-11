import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user';
import { appError } from '../utils/appError';
import { ENV } from '../config/conf';
import jwt from 'jsonwebtoken';
import { ITokenInfo } from '../interfaces/token';
import { getUserById } from '../repositories/userRepository';
interface UserDataRequest extends Request {
  user?: IUser;
}
export const userProtect = async (
  req: UserDataRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token: string | undefined = req.headers.authorization?.split(' ')[1];
    const id: number = Number(req.params.id);
    if (!token) {
      return next(new appError(401, 'User not logged in'));
    }
    if (!id) {
      return next(new appError(400, 'Bad Request'));
    }
    if (ENV.SecretKey === undefined) {
      return next(new appError(500, 'Something went wrong'));
    }
    const tokenInfo: ITokenInfo = jwt.verify(
      token,
      ENV.SecretKey
    ) as ITokenInfo;
    const user: IUser | undefined = await getUserById(id);
    if (user === undefined) {
      return next(new appError(404, 'No user found'));
    } else if (user.UserName !== tokenInfo.userName) {
      return next(new appError(401, 'You are not authorised.'));
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
