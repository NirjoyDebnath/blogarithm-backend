import {
  CreateStoryDTO,
  ICreateStoryInfo,
  ICreateStoryInput
} from '../interfaces/story';
import { getCreateStoryDTO } from './DTOs/storyDTO';
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
