import { Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user';
import { AppError } from '../utils/appError';
import { getUserById } from '../repositories/userRepository';
import { UserDataRequest } from '../interfaces/auth';
import { Role } from '../enums/roles';
import { HttpStatusCode } from '../enums/httpStatusCodes';

const isAuthorizedWithId = async (req: UserDataRequest): Promise<boolean> => {
  const id: string = req.params.id;
  if (!id) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'Not Found');
  }
  const user: IUser | undefined = await getUserById(id);
  if (!user) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'Not Found');
  }
  if (user.Id !== req.tokenInfo?.id) {
    throw new AppError(HttpStatusCode.UNAUTHORIZED, 'You are not authorized');
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
        return next(
          new AppError(HttpStatusCode.UNAUTHORIZED, 'You are not authorized')
        );
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
        return next(
          new AppError(HttpStatusCode.UNAUTHORIZED, 'You are not authorized')
        );
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};
