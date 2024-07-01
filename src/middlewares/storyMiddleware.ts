import { Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { StoryDataRequest, UserDataRequest } from '../interfaces/auth';
import { getStoryById } from '../repositories/storyRepository';
import { IStory } from '../interfaces/story';
import { Role } from '../interfaces/user';

const isAuthorizedWithUserName = async (
  req: StoryDataRequest
): Promise<boolean> => {
  const id: string = req.params.id;
  if (!id) {
    throw new AppError(404, 'Bad request');
  }
  const story: IStory | undefined = await getStoryById(id);
  if (!story) {
    throw new AppError(404, 'Bad request');
  }
  if (story.AuthorUserName !== req.tokenInfo?.userName) {
    throw new AppError(401, 'You are not authorized');
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
      const authorizedWithUserName: boolean =
        await isAuthorizedWithUserName(req);
      if (!authorizedWithUserName) {
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
      const authorizedWithUserName: boolean =
        await isAuthorizedWithUserName(req);
      if (!authorizedWithUserName) {
        return next(new AppError(401, 'You are not authorized'));
      }
    }
    next();
  } catch (err) {
    next(err);
  }
};
