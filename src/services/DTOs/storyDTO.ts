import {
  ICreateStoryDTO,
  ICreateStoryInfo,
  IStory,
  IUpdateStoryInput,
  IStoryDTO,
  IUpdateStoryDTO
} from '../../interfaces/story';
import { AppError } from '../../utils/appError';

export class CreateStoryDTO implements ICreateStoryDTO {
  Title: string;
  Description: string;
  AuthorUserName: string;

  constructor(createStoryInput: ICreateStoryInfo) {
    this.Title = createStoryInput.Title;
    this.Description = createStoryInput.Description;
    this.AuthorUserName = createStoryInput.AuthorUserName;
    this.validateData();
  }
  validateData() {
    if (
      this.Title == undefined ||
      this.Description == undefined ||
      this.AuthorUserName == undefined
    ) {
      throw new AppError(400, 'Data missing');
    }
  }
}

export class StoryDTO implements IStoryDTO {
  Id: string;
  Title: string;
  Description: string;
  AuthorUserName: string;

  constructor(story: IStory) {
    this.Id = story.Id;
    this.Title = story.Title;
    this.Description = story.Description;
    this.AuthorUserName = story.AuthorUserName;
    this.validateData();
  }
  validateData() {
    if (
      this.Id == undefined ||
      this.Title == undefined ||
      this.Description == undefined ||
      this.AuthorUserName == undefined
    ) {
      throw new AppError(400, 'Data missing');
    }
  }
}

export class UpdateStoryDTO implements IUpdateStoryDTO {
  Title?: string;
  Description?: string;

  constructor(updateStoryInput: IUpdateStoryInput) {
    if (updateStoryInput.Title) this.Title = updateStoryInput.Title;
    if (updateStoryInput.Description)
      this.Description = updateStoryInput.Description;
    this.validateData();
  }
  validateData() {
    if (this.Title == undefined && this.Description == undefined) {
      throw new AppError(400, 'Data missing');
    }
  }
}
