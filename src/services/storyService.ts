import {
  CreateStoryDTO,
  ICreateStoryInfo,
  ICreateStoryInput,
  IStory,
  IUpdateStoryInput,
  StoryDTO,
  UpdateStoryDTO
} from '../interfaces/story';
import {
  getCreateStoryDTO,
  getStoryDTO,
  getUpdateStoryDTO
} from './DTOs/storyDTO';
import * as storyRepository from '../repositories/storyRepository';
import { ITokenInfo } from '../interfaces/token';
import { verifyToken } from '../utils/helper';

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
  const createStoryDTO: CreateStoryDTO = new getCreateStoryDTO(createStoryInfo);
  await storyRepository.createStory(createStoryDTO);
};

export const getAllStories = async (): Promise<StoryDTO[]> => {
  const stories: IStory[] = await storyRepository.getAllStories();
  const storyDTO: StoryDTO[] = [];
  stories.forEach((story) => {
    storyDTO.push(new getStoryDTO(story));
  });
  return storyDTO;
};

export const getStoryById = async (id: number): Promise<StoryDTO> => {
  const story: IStory | undefined = await storyRepository.getStoryById(id);
  if (!story) {
    throw new Error('No such story');
  }
  const storyDTO: StoryDTO = new getStoryDTO(story);
  return storyDTO;
};

export const updateStoryById = async (
  id: number,
  updateStoryInput: IUpdateStoryInput
): Promise<void> => {
  const story: IStory | undefined = await storyRepository.getStoryById(id);
  if (!story) {
    // cheking like this is temporary
    throw new Error('No such story');
  }
  const updateStoryDTO: UpdateStoryDTO = new getUpdateStoryDTO(
    updateStoryInput
  );
  await storyRepository.updateStoryById(id, updateStoryDTO);
};

export const deleteStoryById = async (id: number): Promise<void> => {
  const story: IStory | undefined = await storyRepository.getStoryById(id);
  if (!story) {
    // cheking like this is temporary
    throw new Error('No such story');
  }
  await storyRepository.deleteStoryById(id);
};
