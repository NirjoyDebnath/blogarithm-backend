import {
  CreateStoryDTO,
  ICreateStoryInfo,
  IStory,
  StoryDTO
} from '../../interfaces/story';

export class getCreateStoryDTO implements CreateStoryDTO {
  Title: string;
  Description: string;
  AuthorUserName: string;
  AuthorName: string;

  constructor(createStoryInput: ICreateStoryInfo) {
    this.Title = createStoryInput.Title;
    this.Description = createStoryInput.Description;
    this.AuthorUserName = createStoryInput.AuthorUserName;
    this.AuthorName = createStoryInput.AuthorName;
    this.dataValidate();
  }
  dataValidate() {
    if (
      this.Title == undefined ||
      this.Description == undefined ||
      this.AuthorUserName == undefined ||
      this.AuthorName == undefined
    ) {
      throw new Error('Data missing');
    }
  }
}

export class getStoryDTO implements StoryDTO {
  Title: string;
  Description: string;
  AuthorUserName: string;
  AuthorName: string;

  constructor(story: IStory) {
    this.Title = story.Title;
    this.Description = story.Description;
    this.AuthorUserName = story.AuthorUserName;
    this.AuthorName = story.AuthorName;
    this.dataValidate();
  }
  dataValidate() {
    if (
      this.Title == undefined ||
      this.Description == undefined ||
      this.AuthorUserName == undefined ||
      this.AuthorName == undefined
    ) {
      throw new Error('Data missing');
    }
  }
}
