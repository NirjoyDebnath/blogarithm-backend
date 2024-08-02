import {
  ICreateStoryInput,
  IStory,
  IStoryDTO,
  IStoryQueryParams,
  IUpdateStoryInput
} from '../interfaces/story';

export const mockStory: IStory = {
  Id: 'story-37a0-11ef-81cc-088fc31977ac',
  AuthorId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  Title: 'Story',
  Description: 'Description',
  AuthorUserName: 'Nirjoy'
};

export const mockStoryDTO: IStoryDTO = {
  Id: 'story-37a0-11ef-81cc-088fc31977ac',
  AuthorId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  Title: 'Story',
  Description: 'Description',
  AuthorUserName: 'Nirjoy',
  _links: [
    {
      href: '/api/users/4818b0ed-37a0-11ef-81cc-088fc31977ac',
      rel: 'get author',
      type: 'GET'
    },
    {
      href: '/api/story/story-37a0-11ef-81cc-088fc31977ac',
      rel: 'delete story',
      type: 'DELETE'
    },
    {
      href: '/api/story/story-37a0-11ef-81cc-088fc31977ac',
      rel: 'update story',
      type: 'UPDATE'
    }
  ]
};

export const mockCreateStoryInput: ICreateStoryInput = {
  Title: 'Story',
  Description: 'Description'
};

export const mockStoryQueryParams: IStoryQueryParams = {
  AuthorId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  page: 1
};

export const mockUpdateStoryInput: IUpdateStoryInput = {
  Title: 'Updated Title',
  Description: 'Updated story'
};

export const mockStoryQueryParamspage: IStoryQueryParams = {
  page: 1
};

export const mockStoryQueryNoParams: IStoryQueryParams = {};
