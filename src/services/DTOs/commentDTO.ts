import { ITokenInfo } from '../../interfaces/auth';
import { IComment, ICommentDTO, ICommentStoryDTO, ICommentStoryInput } from '../../interfaces/comment';

export class CommentStoryDTO implements ICommentStoryDTO {
  UserId: string;
  StoryId: string;
  UserName: string;
  Comment: string;
  CreatedAt: Date;

  constructor(
    StoryId: string,
    tokenInfo: ITokenInfo,
    commentStoryInput: ICommentStoryInput
  ) {
    this.UserId = tokenInfo.id;
    this.StoryId = StoryId;
    this.UserName = tokenInfo.userName;
    this.Comment = commentStoryInput.Comment;
    this.CreatedAt = new Date();
  }
}

export class CommentDTO implements ICommentDTO {
  UserId: string;
  UserName: string;
  Comment: string;
  CreatedAt: Date;

  constructor(
    comment:IComment|ICommentStoryDTO
  ) {
    this.UserId = comment.UserId;
    this.UserName = comment.UserName;
    this.Comment = comment.Comment;
    this.CreatedAt = comment.CreatedAt;
  }
}
