import { IUpdateNameInput, IUser, UpdateNameDTO } from '../../interfaces/user';
import { UserDTO } from '../../interfaces/user';

export class getAllUsersDTO {
  users: UserDTO[] = [];

  constructor(users: IUser[]) {
    for (const data in users) {
      const Id = users[data].Id;
      const UserName = users[data].UserName;
      const Name = users[data].Name;
      const Email = users[data].Email;
      this.users.push({ Id, UserName, Name, Email });
    }
    this.dataValidate();
  }
  dataValidate() {
    for (const data in this.users) {
      if (
        this.users[data].Id == undefined ||
        this.users[data].UserName == undefined ||
        this.users[data].Name == undefined ||
        this.users[data].Email == undefined
      ) {
        throw new Error('Data missing');
      }
    }
  }
}

export class getUserDTO implements UserDTO {
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
      throw new Error('Data missing');
    }
  }
}

export class getUpdateNameDTO implements UpdateNameDTO {
  Name: string;

  constructor(newUserName: IUpdateNameInput) {
    this.Name = newUserName.Name;
    this.dataValidate();
  }
  dataValidate() {
    if (this.Name == undefined) {
      throw new Error('Data missing');
    }
  }
}
