import { Request, Response, NextFunction } from 'express';
import * as storyService from '../services/storyService';
import { sendResponse } from '../utils/responses';

export const createStory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await storyService.createStory(req.body, req.headers.authorization);
    sendResponse<undefined>(
      req,
      res,
      200,
      undefined,
      'Story create successful'
    );
  } catch (err) {
    next(err);
  }
};
