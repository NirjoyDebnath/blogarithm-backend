import { ITokenInfo } from '../../interfaces/auth';
import { ILike, ILikeDTO, ILikeStoryDTO, IUnlikeStoryDTO } from '../../interfaces/like';

export class LikeStoryDTO implements ILikeStoryDTO {
  UserId: string;
  StoryId: string;
  UserName: string;

  constructor(StoryId: string, tokenInfo: ITokenInfo) {
    this.UserId = tokenInfo.id;
    this.StoryId = StoryId;
    this.UserName = tokenInfo.userName;
  }
}

export class LikeDTO implements ILikeDTO {
  UserId: string;
  UserName: string;

  constructor(like:ILike) {
    this.UserId = like.UserId;
    this.UserName = like.UserName;
  }
}

export class UnlikeStoryDTO implements IUnlikeStoryDTO {
  UserId: string;
  StoryId: string;

  constructor(StoryId: string, tokenInfo: ITokenInfo) {
    this.UserId = tokenInfo.id;
    this.StoryId = StoryId;
  }
}
