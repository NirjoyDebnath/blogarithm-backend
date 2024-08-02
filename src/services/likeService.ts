import { ITokenInfo } from '../interfaces/auth';
import { ILike, ILikeDTO, ILikeStoryDTO, IUnlikeStoryDTO } from '../interfaces/like';
import { LikeDTO, LikeStoryDTO, UnlikeStoryDTO } from './DTOs/likeDTO';
import * as likeRepository from '../repositories/likeRepository';
import { AppError } from '../utils/appError';
import { HttpStatusCode } from '../enums/httpStatusCodes';

export const likeStory = async (
  StoryId: string,
  tokenInfo: ITokenInfo
): Promise<void> => {
  const likeStoryDTO: ILikeStoryDTO = new LikeStoryDTO(StoryId, tokenInfo);
  await likeRepository.likeStory(likeStoryDTO);
};

export const getLikesByStoryId = async (
  StoryId: string
): Promise<ILikeDTO[]> => {
  const likes: ILike[] = await likeRepository.getLikesByStoryId(StoryId);
  const likeDTO: ILikeDTO[] = [];
  likes.forEach((like) => {
    likeDTO.push(new LikeDTO(like));
  });
  return likeDTO;
};

export const unlikeStory = async (
  StoryId: string,
  tokenInfo: ITokenInfo
): Promise<void> => {
  const unlikeStoryDTO:IUnlikeStoryDTO = new UnlikeStoryDTO(StoryId, tokenInfo)
  const rowEffected: number = await likeRepository.unlikeStory(unlikeStoryDTO);
  if (rowEffected === 0) {
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      'Something went wrong.'
    );
  }
};
