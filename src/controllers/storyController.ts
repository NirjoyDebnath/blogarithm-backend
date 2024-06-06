import { Request, Response, NextFunction } from 'express';
import * as storyService from '../services/storyService';
import { sendResponse } from '../utils/responses';
import { StoryDTO } from '../interfaces/story';

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

export const getStories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stories: StoryDTO[] = await storyService.getStories(
      req.query.userName as string | undefined
    );
    sendResponse<StoryDTO[]>(req, res, 200, stories, 'All Stories');
  } catch (err) {
    next(err);
  }
};

export const getStoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const story: StoryDTO = await storyService.getStoryById(
      Number(req.params.id)
    );
    sendResponse<StoryDTO>(req, res, 200, story, 'Got the story');
  } catch (err) {
    next(err);
  }
};

export const updateStoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await storyService.updateStoryById(Number(req.params.id), req.body);
    sendResponse<undefined>(req, res, 200, undefined, 'Updated');
  } catch (err) {
    next(err);
  }
};

export const deleteStoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await storyService.deleteStoryById(Number(req.params.id));
    sendResponse<undefined>(req, res, 200, undefined, 'Deleted');
  } catch (err) {
    next(err);
  }
};
