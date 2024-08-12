import { IComment, ICommentDTO } from '../../interfaces/comment';
import { ILike, ILikeDTO } from '../../interfaces/like';
import {
  ICreateStoryDTO,
  ICreateStoryInfo,
  IStory,
  IUpdateStoryInput,
  IStoryDTO,
  IUpdateStoryDTO,
  IStoriesDTO
} from '../../interfaces/story';
import { IHATEOASLink } from '../../interfaces/user';
import { CommentDTO } from './commentDTO';
import { LikeDTO } from './likeDTO';

export class CreateStoryDTO implements ICreateStoryDTO {
  AuthorId: string;
  Title: string;
  Description: string;
  AuthorUserName: string;
  CreatedAt: Date;

  constructor(createStoryInput: ICreateStoryInfo) {
    this.AuthorId = createStoryInput.AuthorId;
    this.Title = createStoryInput.Title;
    this.Description = createStoryInput.Description;
    this.CreatedAt = new Date();
    this.AuthorUserName = createStoryInput.AuthorUserName;
  }
}

export class StoryDTO implements IStoryDTO {
  Id: string;
  AuthorId: string;
  Title: string;
  Description: string;
  AuthorUserName: string;
  CreatedAt: Date;
  commentCount: number;
  comments?: ICommentDTO[] | undefined;
  likes: ILikeDTO[];
  _links: IHATEOASLink[];

  constructor(
    story: IStory,
    likes: ILike[],
    comments: IComment[],
    sendComments: boolean
  ) {
    this.Id = story.Id;
    this.AuthorId = story.AuthorId;
    this.Title = story.Title;
    this.Description = story.Description;
    this.AuthorUserName = story.AuthorUserName;
    this.CreatedAt = story.CreatedAt;
    this.likes = [];
    for (let i = 0; i < likes.length; i++) {
      this.likes.push(new LikeDTO(likes[i]));
    }
    this.commentCount = comments.length;
    if (sendComments) {
      this.comments = [];
      for (let i = 0; i < comments.length; i++) {
        this.comments.push(new CommentDTO(comments[i]));
      }
    }
    this._links = [
      {
        href: '/api/users/' + story.AuthorId,
        rel: 'get author',
        type: 'GET'
      },
      {
        href: '/api/story/' + story.Id,
        rel: 'delete story',
        type: 'DELETE'
      },
      {
        href: '/api/story/' + story.Id,
        rel: 'update story',
        type: 'UPDATE'
      }
    ];
  }
}

export class StoriesDTO implements IStoriesDTO {
  stories: IStoryDTO[];
  pageCount: number;
  constructor(stories: IStoryDTO[], pageCount: number) {
    this.stories = stories;
    this.pageCount = pageCount;
  }
}

export class UpdateStoryDTO implements IUpdateStoryDTO {
  Title?: string;
  Description?: string;

  constructor(updateStoryInput: IUpdateStoryInput) {
    if (updateStoryInput.Title) this.Title = updateStoryInput.Title;
    if (updateStoryInput.Description)
      this.Description = updateStoryInput.Description;
  }
}
