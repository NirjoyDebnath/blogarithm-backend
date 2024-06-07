interface IUserAttributes {
  Id: number;
  UserName: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: Role.user | Role.admin;
}

export interface IUser extends IUserAttributes {}

export enum Role {
  user = 0,
  admin = 1
}
