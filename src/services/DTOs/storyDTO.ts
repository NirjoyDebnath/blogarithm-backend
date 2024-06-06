import { CreateStoryDTO, ICreateStoryInfo } from '../../interfaces/story';

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
