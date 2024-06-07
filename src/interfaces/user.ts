interface IUserAttributes {
  Id: number;
  UserName: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: Role.user | Role.admin;
}

export interface IUser extends IUserAttributes {}
export interface IUpdateNameInput extends Pick<IUserAttributes, 'Name'> {}

export enum Role {
  user = 0,
  admin = 1
}

export interface UserDTO
  extends Pick<IUserAttributes, 'Id' | 'UserName' | 'Name' | 'Email'> {}

export interface UpdateNameDTO extends Pick<IUserAttributes, 'Name'> {}
