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

export const createStory = async (
  createStoryInput: ICreateStoryInput,
  tokenInfo: ITokenInfo
): Promise<void> => {
  const { userName } = tokenInfo;
  const createStoryInfo: ICreateStoryInfo = {
    AuthorUserName: userName,
    ...createStoryInput
  };
  const createStoryDTO: ICreateStoryDTO = new CreateStoryDTO(createStoryInfo);
  await storyRepository.createStory(createStoryDTO);
};

export const getStories = async (
  storyQueryParams: IStoryQueryParams
): Promise<IStoryDTO[]> => {
  const { AuthorUserName } = storyQueryParams;
  const page: number = storyQueryParams.page || 1;
  const offset: number = Number(ENV.StoryPerPage) * (page - 1);
  const storyPerPage: number = Number(ENV.StoryPerPage);
  const stories: IStory[] = AuthorUserName
    ? await storyRepository.getStoriesByUserName(
        AuthorUserName,
        storyPerPage,
        offset
      )
    : await storyRepository.getAllStories(storyPerPage, offset);

  const storyDTO: StoryDTO[] = [];
  stories.forEach((story) => {
    storyDTO.push(new StoryDTO(story));
  });
  return storyDTO;
};

export const getStoryById = async (id: number): Promise<IStoryDTO> => {
  const story: IStory | undefined = await storyRepository.getStoryById(id);
  if (!story) {
    throw new AppError(404, 'No such story');
  }
  const storyDTO: IStoryDTO = new StoryDTO(story);
  return storyDTO;
};

export const updateStoryById = async (
  id: number,
  updateStoryInput: IUpdateStoryInput
): Promise<void> => {
  const updateStoryDTO: IUpdateStoryDTO = new UpdateStoryDTO(updateStoryInput);
  const isUpdated: boolean = await storyRepository.updateStoryById(
    id,
    updateStoryDTO
  );
  if (isUpdated == false) {
    throw new AppError(404, 'No such sroty');
  }
};

export const deleteStoryById = async (id: number): Promise<void> => {
  const isDeleted: boolean = await storyRepository.deleteStoryById(id);
  if (isDeleted == false) {
    throw new AppError(404, 'No such sroty');
  }
};
