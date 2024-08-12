export interface ILike {
  Id: string;
  UserId: string;
  StoryId: string;
  UserName: string;
}

export interface ILikeStoryDTO {
  UserId: string;
  StoryId: string;
  UserName: string;
}

export interface IUnlikeStoryDTO {
  UserId: string;
  StoryId: string;
}

export interface ILikeDTO {
  UserId:string;
  UserName: string;
}
