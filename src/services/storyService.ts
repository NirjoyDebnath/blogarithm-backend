import {
  ICreateStoryDTO,
  ICreateStoryInfo,
  ICreateStoryInput,
  IStory,
  IUpdateStoryInput,
  IStoryDTO,
  IUpdateStoryDTO,
  IStoryQueryParams,
  IStoriesDTO
} from '../interfaces/story';
import {
  CreateStoryDTO,
  StoriesDTO,
  StoryDTO,
  UpdateStoryDTO
} from './DTOs/storyDTO';
import * as storyRepository from '../repositories/storyRepository';
import * as likeRepository from '../repositories/likeRepository';
import * as commentRepository from '../repositories/commentRepository';
import { ITokenInfo } from '../interfaces/auth';
import { AppError } from '../utils/appError';
import { HttpStatusCode } from '../enums/httpStatusCodes';
import { StoryPerPage } from '../config/constants';
import { ILike } from '../interfaces/like';
import { IComment } from '../interfaces/comment';

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
): Promise<IStoriesDTO> => {
  const AuthorId = storyQueryParams.AuthorId;
  const search = storyQueryParams.search || '';
  const page: number = storyQueryParams.page || 1;
  const offset: number = Number(StoryPerPage) * (page - 1);
  const storyPerPage: number = Number(StoryPerPage);
  const stories: IStory[] = AuthorId
    ? await storyRepository.getStoriesByUserId(
        AuthorId,
        storyPerPage,
        offset,
        search
      )
    : await storyRepository.getAllStories(storyPerPage, offset, search);

  const storyDTO: StoryDTO[] = [];

  for (let i = 0; i < stories.length; i++) {
    const likes: ILike[] = await likeRepository.getLikesByStoryId(
      stories[i].Id
    );
    const comments: IComment[] = await commentRepository.getCommentsByStoryId(
      stories[i].Id
    );
    storyDTO.push(new StoryDTO(stories[i], likes, comments, false));
  }
  const storyCount = AuthorId
    ? search
      ? await storyRepository.getSearchCountByUserId(AuthorId, search)
      : await storyRepository.getStoryCountByUserId(AuthorId)
    : search
      ? await storyRepository.getSearchCount(search)
      : await storyRepository.getStoryCount();
  const storiesDTO = new StoriesDTO(
    storyDTO,
    Math.floor((storyCount + storyPerPage - 1) / storyPerPage)
  );
  return storiesDTO;
};

export const getStoryById = async (id: string): Promise<IStoryDTO> => {
  const story: IStory | undefined = await storyRepository.getStoryById(id);
  if (!story) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'No such story');
  }
  const likes: ILike[] = await likeRepository.getLikesByStoryId(story.Id);
  const comments: IComment[] = await commentRepository.getCommentsByStoryId(
    story.Id
  );
  const storyDTO: IStoryDTO = new StoryDTO(story, likes, comments, true);
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
