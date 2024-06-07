interface IUserAttributes {
  Id: number;
  UserName: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: Role.user | Role.admin;
}

export interface IUser extends IUserAttributes {}
export interface IUpdateUserInput {
  UserName?: string;
  Email?: string;
  Name?: string;
}

export enum Role {
  user = 0,
  admin = 1
}

export interface IUserDTO
  extends Pick<IUserAttributes, 'Id' | 'UserName' | 'Name' | 'Email'> {}
export interface IUpdateUserDTO {
  UserName?: string;
  Email?: string;
  Name?: string;
}
