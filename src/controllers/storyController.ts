import { Request, Response, NextFunction } from 'express';
import * as storyService from '../services/storyService';
import { sendResponse } from '../utils/responses';
import { ICreateStoryDTO, IStoryDTO } from '../interfaces/story';
import { StoryDataRequest } from '../interfaces/auth';
import { HttpStatusCode } from '../enums/httpStatusCodes';

export const createStory = async (
  req: StoryDataRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const story: ICreateStoryDTO = await storyService.createStory(
      req.body,
      req.tokenInfo!
    );
    sendResponse(
      req,
      res,
      HttpStatusCode.CREATED,
      'Story create successful',
      story
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
    const stories: IStoryDTO[] = await storyService.getStories(req.query);
    sendResponse<IStoryDTO[]>(
      req,
      res,
      HttpStatusCode.OK,
      'All Stories',
      stories
    );
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
    const story: IStoryDTO = await storyService.getStoryById(req.params.id);
    sendResponse<IStoryDTO>(
      req,
      res,
      HttpStatusCode.OK,
      'Got the story',
      story
    );
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
    await storyService.updateStoryById(req.params.id, req.body);
    sendResponse(req, res, HttpStatusCode.OK, 'Updated');
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
    await storyService.deleteStoryById(req.params.id);
    sendResponse(req, res, HttpStatusCode.OK, 'Deleted');
  } catch (err) {
    next(err);
  }
};
