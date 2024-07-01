interface IStoryAttributes {
  Id: string;
  Title: string;
  Description: string;
  AuthorUserName: string;
}

export interface IStory extends IStoryAttributes {}
export interface ICreateStoryInput
  extends Pick<IStoryAttributes, 'Title' | 'Description'> {}
export interface ICreateStoryInfo
  extends Omit<IStoryAttributes, 'Id' | 'AuthorName'> {}
export interface IUpdateStoryInput {
  Title?: string;
  Description?: string;
}

export interface ICreateStoryDTO extends Omit<IStoryAttributes, 'Id'> {}
export interface IStoryDTO extends IStoryAttributes {}
export interface IUpdateStoryDTO {
  Title?: string;
  Description?: string;
}

export interface IStoryQueryParams {
  AuthorUserName?: string;
  page?: number;
}
