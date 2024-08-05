import { ILike, ILikeStoryDTO, IUnlikeStoryDTO } from '../interfaces/like';
import db from '../database/db';

export const likeStory = async (
  likeStoryInfo: ILikeStoryDTO
): Promise<void> => {
  await db('Likes').insert(likeStoryInfo);
};

export const getLikesByStoryId = async (StoryId: string): Promise<ILike[]> => {
  const likes: ILike[] = await db<ILike>('Likes').select('*').where('StoryId', StoryId);
  return likes;
};

export const unlikeStory = async (
  unlikeStoryDTO: IUnlikeStoryDTO
): Promise<number> => {
  const rowEffected: number = await db('Likes').where(unlikeStoryDTO).del();
  console.log(rowEffected)
  return rowEffected;
};
