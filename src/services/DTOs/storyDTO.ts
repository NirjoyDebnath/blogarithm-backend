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
  AuthorName: string;

  constructor(createStoryInput: ICreateStoryInfo) {
    this.Title = createStoryInput.Title;
    this.Description = createStoryInput.Description;
    this.AuthorUserName = createStoryInput.AuthorUserName;
    this.AuthorName = createStoryInput.AuthorName;
    this.validateData();
  }
  validateData() {
    if (
      this.Title == undefined ||
      this.Description == undefined ||
      this.AuthorUserName == undefined ||
      this.AuthorName == undefined
    ) {
      throw new AppError(400, 'Data missing');
    }
  }
}

export class StoryDTO implements IStoryDTO {
  Title: string;
  Description: string;
  AuthorUserName: string;
  AuthorName: string;

  constructor(story: IStory) {
    this.Title = story.Title;
    this.Description = story.Description;
    this.AuthorUserName = story.AuthorUserName;
    this.AuthorName = story.AuthorName;
    this.validateData();
  }
  validateData() {
    if (
      this.Title == undefined ||
      this.Description == undefined ||
      this.AuthorUserName == undefined ||
      this.AuthorName == undefined
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
