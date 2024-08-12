import db from '../database/db';
import { IComment, ICommentStoryDTO } from '../interfaces/comment';

export const commentStory = async (
  commentStoryInfo: ICommentStoryDTO
): Promise<void> => {
  await db('comments').insert(commentStoryInfo);
};

export const getCommentsByStoryId = async (
  StoryId: string
): Promise<IComment[]> => {
  const comments: IComment[] = await db<IComment>('comments')
    .select('*')
    .where('StoryId', StoryId)
    .orderBy('CreatedAt', 'desc');
  return comments;
};
