import { ILike, ILikeDTO, ILikeStoryDTO, IUnlikeStoryDTO } from "../interfaces/like";

export const mockLikes:ILike[] = [{
  Id: 'comment-37a0-11ef-81cc-088fc31977ac',
  StoryId: 'story-37a0-11ef-81cc-088fc31977ac',
  UserId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  UserName: 'Nirjoy',
}]

export const mockLikesDTO:ILikeStoryDTO = {
  UserId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  StoryId: 'story-37a0-11ef-81cc-088fc31977a',
  UserName: 'Nirjoy',
}

export const mockLikeDTO:ILikeDTO = {
  UserId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  UserName: 'Nirjoy',
}

export const mockUnlikesDTO:IUnlikeStoryDTO = {
  UserId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  StoryId: 'story-37a0-11ef-81cc-088fc31977a',
}