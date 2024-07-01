interface IUserAttributes {
  Id: string;
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
export interface IUpdatePasswordUserInput {
  CurrentPassword: string;
  NewPassword: string;
}

export enum Role {
  user = 0,
  admin = 1
}
export interface IHATEOASLink {
  href: string;
  rel: string;
  type: string;
}

export interface IUserDTO
  extends Pick<IUserAttributes, 'Id' | 'UserName' | 'Name' | 'Email'> {
  _links: IHATEOASLink[];
}
export interface IUpdateUserDTO {
  UserName?: string;
  Email?: string;
  Name?: string;
}
export interface IUpdatePasswordUserInputDTO {
  CurrentPassword: string;
  NewPassword: string;
}

export interface IUserQueryParams {
  page?: number;
}
