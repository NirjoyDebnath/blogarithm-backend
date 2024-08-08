import { Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { StoryDataRequest, UserDataRequest } from '../interfaces/auth';
import { getStoryById } from '../repositories/storyRepository';
import { IStory } from '../interfaces/story';
import { Role } from '../enums/roles';
import { HttpStatusCode } from '../enums/httpStatusCodes';

const isAuthorizedWithId = async (req: StoryDataRequest): Promise<boolean> => {
  const id: string = req.params.id;
  if (!id) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'Not Found');
  }
  const story: IStory | undefined = await getStoryById(id);
  if (!story) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'Not Found');
  }
  if (story.AuthorId !== req.tokenInfo?.id) {
    throw new AppError(HttpStatusCode.UNAUTHORIZED, 'You are not authorized');
  }
  req.story = story;
  return true;
};

export const authorizeUpdate = async (
  req: StoryDataRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (req.tokenInfo?.role === Role.user) {
      const authorizedWithUserName: boolean = await isAuthorizedWithId(req);
      if (!authorizedWithUserName) {
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
      const authorizedWithUserName: boolean = await isAuthorizedWithId(req);
      if (!authorizedWithUserName) {
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
