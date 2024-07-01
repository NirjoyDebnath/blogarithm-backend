import { Request } from 'express';
import { IStory } from './story';
interface IAuthAttributes {
  Id: string;
  UserId: string;
  UserName: string;
  Password: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  PasswordModifiedAt: Date;
  Role: number;
}

interface IToken {
  id: string;
  userName: string;
  name: string;
  role: number;
  iat: number;
  exp: number;
}

export interface ISignUpUserInfoType
  extends Omit<
    IAuthAttributes,
    'Id' | 'UserId' | 'Password' | 'PasswordModifiedAt'
  > {}
export interface ISignUpUserInputType
  extends Omit<
    IAuthAttributes,
    'Id' | 'UserId' | 'JoinDate' | 'Role' | 'PasswordModifiedAt'
  > {}
export interface IUser
  extends Omit<IAuthAttributes, 'UserId' | 'Password' | 'PasswordModifiedAt'> {}
export interface ISignUpAuthInfoType
  extends Pick<
    IAuthAttributes,
    'UserId' | 'UserName' | 'Password' | 'PasswordModifiedAt'
  > {}
export interface IAuth
  extends Pick<
    IAuthAttributes,
    'Id' | 'UserId' | 'UserName' | 'Password' | 'PasswordModifiedAt'
  > {}
export interface ILogInAuthInfoType
  extends Pick<
    IAuthAttributes,
    'UserName' | 'Password' | 'PasswordModifiedAt'
  > {}
export interface ILogInAuthInputType
  extends Pick<IAuthAttributes, 'UserName' | 'Password'> {}

export interface ISignUpUserDTO
  extends Omit<
    IAuthAttributes,
    'Id' | 'UserId' | 'Password' | 'PasswordModifiedAt'
  > {}
export interface ISignUpAuthDTO
  extends Pick<
    IAuthAttributes,
    'UserName' | 'Password' | 'PasswordModifiedAt'
  > {}
export interface ILogInDTO
  extends Pick<IAuthAttributes, 'UserName' | 'Password'> {}

export interface ITokenInfo extends IToken {}
export interface IPayload
  extends Pick<IToken, 'id' | 'userName' | 'name' | 'role'> {}

export interface AuthRequest extends Request {
  tokenInfo?: ITokenInfo;
}
export interface UserDataRequest extends Request {
  user?: IUser;
  tokenInfo?: ITokenInfo;
}
export interface StoryDataRequest extends Request {
  story?: IStory;
  tokenInfo?: ITokenInfo;
}
