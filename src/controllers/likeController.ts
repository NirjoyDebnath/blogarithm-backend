import { Request, Response, NextFunction } from 'express';
import * as likeService from '../services/likeService';
import { AuthRequest } from '../interfaces/auth';
import { HttpStatusCode } from '../enums/httpStatusCodes';
import { sendResponse } from '../utils/responses';
import { ILikeDTO } from '../interfaces/like';

export const likeStory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await likeService.likeStory(req.params.id, req.tokenInfo!);
    sendResponse(req, res, HttpStatusCode.CREATED, 'Liked story');
  } catch (err) {
    next(err);
  }
};

export const getLikesByStoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const likes:ILikeDTO[] = await likeService.getLikesByStoryId(req.params.id);
    sendResponse(
      req,
      res,
      HttpStatusCode.OK,
      'All likes',
      likes
    );
  } catch (err) {
    next(err);
  }
};

export const unlikeStory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await likeService.unlikeStory(req.params.id, req.tokenInfo!);
    sendResponse(req, res, HttpStatusCode.CONFLICT, 'Unliked story');
  } catch (err) {
    next(err);
  }
};
