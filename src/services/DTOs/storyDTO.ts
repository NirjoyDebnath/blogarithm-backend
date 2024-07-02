import {
  ICreateStoryDTO,
  ICreateStoryInfo,
  IStory,
  IUpdateStoryInput,
  IStoryDTO,
  IUpdateStoryDTO
} from '../../interfaces/story';
import { IHATEOASLink } from '../../interfaces/user';

export class CreateStoryDTO implements ICreateStoryDTO {
  AuthorId: string;
  Title: string;
  Description: string;
  AuthorUserName: string;

  constructor(createStoryInput: ICreateStoryInfo) {
    this.AuthorId = createStoryInput.AuthorId;
    this.Title = createStoryInput.Title;
    this.Description = createStoryInput.Description;
    this.AuthorUserName = createStoryInput.AuthorUserName;
  }
}

export class StoryDTO implements IStoryDTO {
  Id: string;
  AuthorId: string;
  Title: string;
  Description: string;
  AuthorUserName: string;
  _links: IHATEOASLink[];

  constructor(story: IStory) {
    this.Id = story.Id;
    this.AuthorId = story.AuthorId;
    this.Title = story.Title;
    this.Description = story.Description;
    this.AuthorUserName = story.AuthorUserName;
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

export class UpdateStoryDTO implements IUpdateStoryDTO {
  Title?: string;
  Description?: string;

  constructor(updateStoryInput: IUpdateStoryInput) {
    if (updateStoryInput.Title) this.Title = updateStoryInput.Title;
    if (updateStoryInput.Description)
      this.Description = updateStoryInput.Description;
  }
}
