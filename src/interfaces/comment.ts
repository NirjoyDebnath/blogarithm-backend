export interface IComment {
  Id: string;
  UserId: string;
  StoryId: string;
  UserName: string;
  Comment: string;
  CreatedAt:Date;
}
export interface ICommentStoryInput {
  Comment: string;
}
export interface ICommentStoryDTO {
  UserId: string;
  StoryId: string;
  UserName: string;
  Comment: string;
  CreatedAt:Date;
}

export interface ICommentDTO {
  UserId: string;
  UserName: string;
  Comment: string;
  CreatedAt:Date;
}
