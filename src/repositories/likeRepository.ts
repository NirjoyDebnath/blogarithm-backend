import { ILike, ILikeStoryDTO, IUnlikeStoryDTO } from '../interfaces/like';
import db from '../database/db';

export const likeStory = async (
  likeStoryInfo: ILikeStoryDTO
): Promise<void> => {
  await db('likes').insert(likeStoryInfo);
};

export const getLikesByStoryId = async (StoryId: string): Promise<ILike[]> => {
  const likes: ILike[] = await db<ILike>('likes').select('*').where('StoryId', StoryId);
  return likes;
};

export const unlikeStory = async (
  unlikeStoryDTO: IUnlikeStoryDTO
): Promise<number> => {
  const rowEffected: number = await db('likes').where(unlikeStoryDTO).del();
  return rowEffected;
};
