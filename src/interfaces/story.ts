interface IStoryAttributes {
  Id: number;
  Title: string;
  Description: string;
  AuthorName: string;
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
export interface IStoryDTO extends Omit<IStoryAttributes, 'Id'> {}
export interface IUpdateStoryDTO {
  Title?: string;
  Description?: string;
}
