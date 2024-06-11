import {
  ICreateStoryDTO,
  ICreateStoryInfo,
  ICreateStoryInput,
  IStory,
  IUpdateStoryInput,
  IStoryDTO,
  IUpdateStoryDTO
} from '../interfaces/story';
import { CreateStoryDTO, StoryDTO, UpdateStoryDTO } from './DTOs/storyDTO';
import * as storyRepository from '../repositories/storyRepository';
import { ITokenInfo } from '../interfaces/token';
import { verifyToken } from '../utils/jwtHelper';
import { AppError } from '../utils/appError';

export const createStory = async (
  createStoryInput: ICreateStoryInput,
  token: string | undefined
): Promise<void> => {
  const tokenInfo: ITokenInfo = await verifyToken(token);
  const { userName, name } = tokenInfo;
  const createStoryInfo: ICreateStoryInfo = {
    AuthorName: name,
    AuthorUserName: userName,
    ...createStoryInput
  };
  const createStoryDTO: ICreateStoryDTO = new CreateStoryDTO(createStoryInfo);
  await storyRepository.createStory(createStoryDTO);
};

export const getStories = async (
  userName: string | undefined
): Promise<IStoryDTO[]> => {
  const stories: IStory[] = userName
    ? await storyRepository.getStoriesByUserName(userName)
    : await storyRepository.getAllStories();

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
