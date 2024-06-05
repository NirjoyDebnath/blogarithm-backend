import { IUser } from '../../interfaces/user';
export interface userDTO {
  id: number;
  userName: string;
  email: string;
}

export class getAllUsersDTO {
  users: userDTO[] = [];

  constructor(datas: IUser[]) {
    for (const data in datas) {
      const id = datas[data].Id;
      const userName = datas[data].UserName;
      const email = datas[data].Email;
      this.users.push({ id, userName, email });
    }
    this.dataValidate();
  }
  dataValidate() {
    for (const data in this.users) {
      if (
        this.users[data].id == undefined ||
        this.users[data].userName == undefined ||
        this.users[data].email == undefined
      ) {
        throw new Error('Data missing');
      }
    }
  }
}
