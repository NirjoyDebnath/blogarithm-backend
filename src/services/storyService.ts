import {
  CreateStoryDTO,
  ICreateStoryInfo,
  ICreateStoryInput,
  IStory,
  StoryDTO
} from '../interfaces/story';
import { getCreateStoryDTO, getStoryDTO } from './DTOs/storyDTO';
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
