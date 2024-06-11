import { Request, Response, NextFunction } from 'express';
import * as storyService from '../services/storyService';
import { sendResponse } from '../utils/responses';
import { IStoryDTO } from '../interfaces/story';
import { StoryDataRequest } from '../interfaces/auth';

export const createStory = async (
  req: StoryDataRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await storyService.createStory(req.body, req.tokenInfo!);
    sendResponse(req, res, 200, 'Story create successful');
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
    const stories: IStoryDTO[] = await storyService.getStories(
      req.query.userName as string | undefined
    );
    sendResponse<IStoryDTO[]>(req, res, 200, 'All Stories', stories);
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
    const story: IStoryDTO = await storyService.getStoryById(
      Number(req.params.id)
    );
    sendResponse<IStoryDTO>(req, res, 200, 'Got the story', story);
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
    sendResponse(req, res, 200, 'Updated');
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
    sendResponse(req, res, 200, 'Deleted');
  } catch (err) {
    next(err);
  }
};
