import {
  IUser,
  IUpdateUserDTO,
  IUserDTO,
  IUpdateUserInput
} from '../../interfaces/user';
import { AppError } from '../../utils/appError';

export class UserDTO implements IUserDTO {
  Id: number;
  UserName: string;
  Name: string;
  Email: string;

  constructor(user: IUser) {
    this.Id = user.Id;
    this.UserName = user.UserName;
    this.Name = user.Name;
    this.Email = user.Email;
    this.dataValidate();
  }
  dataValidate() {
    if (
      this.Id == undefined ||
      this.UserName == undefined ||
      this.Name == undefined ||
      this.Email == undefined
    ) {
      throw new AppError(400, 'Data missing');
    }
  }
}

export class UpdateUserDTO implements IUpdateUserDTO {
  UserName?: string;
  Email?: string;
  Name?: string;

  constructor(newUserName: IUpdateUserInput) {
    this.UserName = newUserName.UserName;
    this.Email = newUserName.Email;
    this.Name = newUserName.Name;
    this.dataValidate();
  }
  dataValidate() {
    if (
      this.UserName == undefined &&
      this.Email == undefined &&
      this.Name == undefined
    ) {
      throw new AppError(400, 'Data missing');
    }
  }
}
