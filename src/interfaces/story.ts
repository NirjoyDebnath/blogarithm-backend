import { ICommentDTO } from './comment';
import { ILikeDTO } from './like';
import { IHATEOASLink } from './user';

interface IStoryAttributes {
  Id: string;
  AuthorId: string;
  Title: string;
  Description: string;
  AuthorUserName: string;
  CreatedAt: Date;
}

export interface IStory extends IStoryAttributes {}
export interface ICreateStoryInput
  extends Pick<IStoryAttributes, 'Title' | 'Description'> {}
export interface ICreateStoryInfo
  extends Omit<IStoryAttributes, 'Id' | 'CreatedAt'> {}
export interface IUpdateStoryInput {
  Title?: string;
  Description?: string;
}

export interface ICreateStoryDTO extends Omit<IStoryAttributes, 'Id'> {}
export interface IStoryDTO extends IStoryAttributes {
  commentCount:number;
  comments?:ICommentDTO[];
  likes?: ILikeDTO[];
  _links: IHATEOASLink[];
}
export interface IStoriesDTO {
  stories:IStoryDTO[];
  pageCount:number;
}
export interface IUpdateStoryDTO {
  Title?: string;
  Description?: string;
}

export interface IStoryQueryParams {
  AuthorId?: string;
  search?: string;
  page?: number;
}
