import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../interfaces/auth';
import * as commentService from '../services/commentService';
import { sendResponse } from '../utils/responses';
import { HttpStatusCode } from '../enums/httpStatusCodes';
import { ICommentDTO } from '../interfaces/comment';

export const commentStory = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await commentService.commentStory(req.params.id, req.tokenInfo!, req.body);
    sendResponse(req, res, HttpStatusCode.CREATED, 'Comment successful');
  } catch (err) {
    next(err);
  }
};

export const getCommentsByStoryId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const comments: ICommentDTO[] = await commentService.getCommentsByStoryId(
      req.params.id
    );
    sendResponse(req, res, HttpStatusCode.OK, 'All comments', comments);
  } catch (err) {
    next(err);
  }
};
