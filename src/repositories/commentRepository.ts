import db from '../database/db';
import { IComment, ICommentStoryDTO } from '../interfaces/comment';

export const commentStory = async (
  commentStoryInfo: ICommentStoryDTO
): Promise<void> => {
  await db('Comments').insert(commentStoryInfo);
};

export const getCommentsByStoryId = async (
  StoryId: string
): Promise<IComment[]> => {
  const comments: IComment[] = await db<IComment>('Comments')
    .select('*')
    .where('StoryId', StoryId)
    .orderBy('CreatedAt', 'asc');
  return comments;
};
