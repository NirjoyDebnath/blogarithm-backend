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

export interface CreateStoryDTO extends Omit<IStoryAttributes, 'Id'> {}
export interface StoryDTO extends Omit<IStoryAttributes, 'Id'> {}
