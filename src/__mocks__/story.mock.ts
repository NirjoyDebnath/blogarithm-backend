import {
  ICreateStoryInput,
  IStoriesDTO,
  IStory,
  IStoryDTO,
  IStoryQueryParams,
  IUpdateStoryInput
} from '../interfaces/story';

export const date = new Date();

export const mockStoryId: string = 'story-37a0-11ef-81cc-088fc31977ac';

export const mockStory: IStory = {
  Id: 'story-37a0-11ef-81cc-088fc31977ac',
  AuthorId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  Title: 'Story',
  Description: 'Description',
  AuthorUserName: 'Nirjoy',
  CreatedAt: date
};

export const mockStoryDTO: IStoriesDTO = {
  pageCount: 1,
  stories: [
    {
      AuthorId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
      AuthorUserName: 'Nirjoy',
      CreatedAt: date,
      Description: 'Description',
      Id: 'story-37a0-11ef-81cc-088fc31977ac',
      Title: 'Story',
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
      ],
      commentCount: 1,
      likes: [
        { UserId: '4818b0ed-37a0-11ef-81cc-088fc31977ac', UserName: 'Nirjoy' }
      ]
    }
  ]
};

export const mockStoryWithIdDTO: IStoryDTO = {
  Id: 'story-37a0-11ef-81cc-088fc31977ac',
  AuthorId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  Title: 'Story',
  Description: 'Description',
  AuthorUserName: 'Nirjoy',
  CreatedAt: date,
  commentCount: 1,
  comments: [
    {
      UserId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
      UserName: 'Nirjoy',
      Comment: 'Nice story',
      CreatedAt: date
    }
  ],
  likes: [
    { UserId: '4818b0ed-37a0-11ef-81cc-088fc31977ac', UserName: 'Nirjoy' }
  ],
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

export const mockStoryQueryParamsSearch: IStoryQueryParams = {
  search: 'D',
  page: 1
};

export const mockStoryQueryParamsAuthor: IStoryQueryParams = {
  AuthorId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  page: 1
};
export const mockStoryQueryParamsSearchAuthor: IStoryQueryParams = {
  search: 'D',
  AuthorId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  page: 1
};

export const mockStoryQueryNoParams: IStoryQueryParams = {};
