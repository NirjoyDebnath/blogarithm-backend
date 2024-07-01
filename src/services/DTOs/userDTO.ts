import {
  IUser,
  IUpdateUserDTO,
  IUserDTO,
  IUpdateUserInput,
  IUpdatePasswordUserInputDTO,
  IUpdatePasswordUserInput,
  IHATEOASLink
} from '../../interfaces/user';
import { AppError } from '../../utils/appError';

export class UserDTO implements IUserDTO {
  Id: string;
  UserName: string;
  Name: string;
  Email: string;
  _links: IHATEOASLink[];

  constructor(user: IUser) {
    this.Id = user.Id;
    this.UserName = user.UserName;
    this.Name = user.Name;
    this.Email = user.Email;
    this._links = [
      {
        href: '/api/users/' + user.Id,
        rel: 'get user',
        type: 'GET'
      },
      {
        href: '/api/users/' + user.Id,
        rel: 'delete user',
        type: 'DELETE'
      },
      {
        href: '/api/users/' + user.Id,
        rel: 'update user',
        type: 'UPDATE'
      }
    ];
    this.validateData();
  }
  validateData() {
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

  constructor(newUser: IUpdateUserInput) {
    this.UserName = newUser.UserName;
    this.Email = newUser.Email;
    this.Name = newUser.Name;
    this.validateData();
  }
  validateData() {
    if (
      this.UserName == undefined &&
      this.Email == undefined &&
      this.Name == undefined
    ) {
      throw new AppError(400, 'Data missing');
    }
  }
}

export class UpdatePasswordUserInputDTO implements IUpdatePasswordUserInputDTO {
  CurrentPassword: string;
  NewPassword: string;

  constructor(updatePasswordUserInput: IUpdatePasswordUserInput) {
    this.CurrentPassword = updatePasswordUserInput.CurrentPassword;
    this.NewPassword = updatePasswordUserInput.NewPassword;
    this.validateData();
  }
  validateData() {
    if (this.CurrentPassword == undefined || this.NewPassword == undefined) {
      throw new AppError(400, 'Data missing');
    }
  }
}
