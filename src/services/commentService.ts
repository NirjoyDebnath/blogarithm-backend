import { ITokenInfo } from '../interfaces/auth';
import { IComment, ICommentDTO, ICommentStoryDTO, ICommentStoryInput } from '../interfaces/comment';
import { CommentDTO, CommentStoryDTO } from './DTOs/commentDTO';
import * as commentRepository from '../repositories/commentRepository';

export const commentStory = async (
  StoryId: string,
  tokenInfo: ITokenInfo,
  commentStoryInput: ICommentStoryInput
): Promise<ICommentDTO> => {
  const commentStoryDTO: ICommentStoryDTO = new CommentStoryDTO(
    StoryId,
    tokenInfo,
    commentStoryInput
  );
  const comment: ICommentDTO = new CommentDTO(commentStoryDTO);
  await commentRepository.commentStory(commentStoryDTO);
  return comment;
};

export const getCommentsByStoryId = async (StoryId: string): Promise<ICommentDTO[]> => {
  const comments: IComment[] = await commentRepository.getCommentsByStoryId(StoryId);
  const commentDTO: ICommentDTO[] = [];
  comments.forEach((comment) => {
    commentDTO.push(new CommentDTO(comment));
  });
  return commentDTO;
};
