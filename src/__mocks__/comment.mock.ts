import {
  IComment,
  ICommentDTO,
  ICommentStoryInput
} from '../interfaces/comment';
import { date } from './story.mock';

export const mockComments: IComment[] = [
  {
    Id: 'comment-37a0-11ef-81cc-088fc31977ac',
    StoryId: 'story-37a0-11ef-81cc-088fc31977ac',
    UserId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
    UserName: 'Nirjoy',
    Comment: 'Nice story',
    CreatedAt: date
  }
];

export const mockCommentDTO: ICommentDTO = {
  UserId: '4818b0ec-37a0-11ef-81cc-088fc31977ac',
  UserName: 'Nirjoy',
  Comment: 'Nice story',
  CreatedAt: date
};

export const mockCommentInput: ICommentStoryInput = {
  Comment: 'Nice story'
};
