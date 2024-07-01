import { Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user';
import { AppError } from '../utils/appError';
import { getUserById } from '../repositories/userRepository';
import { UserDataRequest } from '../interfaces/auth';
import { Role } from '../interfaces/user';

const isAuthorizedWithId = async (req: UserDataRequest): Promise<boolean> => {
  const id: string = req.params.id;
  if (!id) {
    throw new AppError(404, 'Bad request');
  }
  const user: IUser | undefined = await getUserById(id);
  if (!user) {
    throw new AppError(404, 'Bad request');
  }
  if (user.UserName !== req.tokenInfo?.userName) {
    throw new AppError(401, 'You are not authorized');
  }
  req.user = user;
  return true;
};

export const authorizeUpdate = async (
  req: UserDataRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.tokenInfo?.role === Role.user) {
      const authorizedWithId: boolean = await isAuthorizedWithId(req);
      if (!authorizedWithId) {
        return next(new AppError(401, 'You are not authorized'));
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const authorizeDeletion = async (
  req: UserDataRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.tokenInfo?.role === Role.user) {
      const authorizedWithId: boolean = await isAuthorizedWithId(req);
      if (!authorizedWithId) {
        return next(new AppError(401, 'You are not authorized'));
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};
