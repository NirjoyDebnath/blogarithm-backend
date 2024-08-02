import { ITokenInfo } from '../interfaces/auth';
import { IComment, ICommentDTO, ICommentStoryDTO, ICommentStoryInput } from '../interfaces/comment';
import { CommentDTO, CommentStoryDTO } from './DTOs/commentDTO';
import * as commentRepository from '../repositories/commentRepository';

export const commentStory = async (
  StoryId: string,
  tokenInfo: ITokenInfo,
  commentStoryInput: ICommentStoryInput
): Promise<void> => {
  const commentStoryDTO: ICommentStoryDTO = new CommentStoryDTO(
    StoryId,
    tokenInfo,
    commentStoryInput
  );
  await commentRepository.commentStory(commentStoryDTO);
};

export const getCommentsByStoryId = async (StoryId: string): Promise<ICommentDTO[]> => {
  const comments: IComment[] = await commentRepository.getCommentsByStoryId(StoryId);
  const commentDTO: ICommentDTO[] = [];
  comments.forEach((comment) => {
    commentDTO.push(new CommentDTO(comment));
  });
  return commentDTO;
};
