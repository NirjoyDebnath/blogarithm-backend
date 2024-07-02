import {
  IUser,
  IUpdateUserDTO,
  IUserDTO,
  IUpdateUserInput,
  IUpdatePasswordUserInputDTO,
  IUpdatePasswordUserInput,
  IHATEOASLink
} from '../../interfaces/user';

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
  }
}

export class UpdatePasswordUserInputDTO implements IUpdatePasswordUserInputDTO {
  CurrentPassword: string;
  NewPassword: string;

  constructor(updatePasswordUserInput: IUpdatePasswordUserInput) {
    this.CurrentPassword = updatePasswordUserInput.CurrentPassword;
    this.NewPassword = updatePasswordUserInput.NewPassword;
  }
}
