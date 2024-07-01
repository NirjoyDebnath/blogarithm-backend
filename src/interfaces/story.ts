import { IHATEOASLink } from './user';

interface IStoryAttributes {
  Id: string;
  AuthorId: string;
  Title: string;
  Description: string;
  AuthorUserName: string;
}

export interface IStory extends IStoryAttributes {}
export interface ICreateStoryInput
  extends Pick<IStoryAttributes, 'Title' | 'Description'> {}
export interface ICreateStoryInfo extends Omit<IStoryAttributes, 'Id'> {}
export interface IUpdateStoryInput {
  Title?: string;
  Description?: string;
}

export interface ICreateStoryDTO extends Omit<IStoryAttributes, 'Id'> {}
export interface IStoryDTO extends IStoryAttributes {
  _links: IHATEOASLink[];
}
export interface IUpdateStoryDTO {
  Title?: string;
  Description?: string;
}

export interface IStoryQueryParams {
  AuthorId?: string;
  page?: number;
}
