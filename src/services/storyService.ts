import {
  ICreateStoryDTO,
  ICreateStoryInfo,
  ICreateStoryInput,
  IStory,
  IUpdateStoryInput,
  IStoryDTO,
  IUpdateStoryDTO,
  IStoryQueryParams
} from '../interfaces/story';
import { CreateStoryDTO, StoryDTO, UpdateStoryDTO } from './DTOs/storyDTO';
import * as storyRepository from '../repositories/storyRepository';
import { ITokenInfo } from '../interfaces/auth';
import { AppError } from '../utils/appError';
import { ENV } from '../config/conf';
import { HttpStatusCode } from '../enums/httpStatusCodes';

export const createStory = async (
  createStoryInput: ICreateStoryInput,
  tokenInfo: ITokenInfo
): Promise<ICreateStoryDTO> => {
  const { id, userName } = tokenInfo;
  const createStoryInfo: ICreateStoryInfo = {
    AuthorId: id,
    AuthorUserName: userName,
    ...createStoryInput
  };
  const createStoryDTO: ICreateStoryDTO = new CreateStoryDTO(createStoryInfo);
  await storyRepository.createStory(createStoryDTO);
  return createStoryDTO;
};

export const getStories = async (
  storyQueryParams: IStoryQueryParams
): Promise<IStoryDTO[]> => {
  const { AuthorId } = storyQueryParams;
  const page: number = storyQueryParams.page || 1;
  const offset: number = Number(ENV.StoryPerPage) * (page - 1);
  const storyPerPage: number = Number(ENV.StoryPerPage);
  const stories: IStory[] = AuthorId
    ? await storyRepository.getStoriesByUserId(AuthorId, storyPerPage, offset)
    : await storyRepository.getAllStories(storyPerPage, offset);

  const storyDTO: StoryDTO[] = [];
  stories.forEach((story) => {
    storyDTO.push(new StoryDTO(story));
  });
  if (storyDTO.length === 0) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'No stories found');
  }
  return storyDTO;
};

export const getStoryById = async (id: string): Promise<IStoryDTO> => {
  const story: IStory | undefined = await storyRepository.getStoryById(id);
  if (!story) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'No such story');
  }
  const storyDTO: IStoryDTO = new StoryDTO(story);
  return storyDTO;
};

export const updateStoryById = async (
  id: string,
  updateStoryInput: IUpdateStoryInput
): Promise<void> => {
  const updateStoryDTO: IUpdateStoryDTO = new UpdateStoryDTO(updateStoryInput);
  const isUpdated: boolean = await storyRepository.updateStoryById(
    id,
    updateStoryDTO
  );
  if (isUpdated == false) {
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      'Something went wrong.'
    );
  }
};

export const deleteStoryById = async (id: string): Promise<void> => {
  const isDeleted: boolean = await storyRepository.deleteStoryById(id);
  if (isDeleted == false) {
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      'Something went wrong.'
    );
  }
};
