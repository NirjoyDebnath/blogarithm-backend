import { Request } from 'express';
import { IStory } from './story';
interface IAuthAttributes {
  Id: number;
  UserName: string;
  Password: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: number;
}

interface IToken {
  userName: string;
  name: string;
  role: number;
  iat: number;
  exp: number;
}

export interface ISignUpUserInfoType
  extends Omit<IAuthAttributes, 'Id' | 'Password'> {}
export interface ISignUpUserInputType
  extends Omit<IAuthAttributes, 'Id' | 'JoinDate' | 'Role'> {}
export interface IUser extends Omit<IAuthAttributes, 'Password'> {}
export interface ISignUpAuthInfoType
  extends Pick<IAuthAttributes, 'UserName' | 'Password'> {}
export interface IAuth
  extends Pick<IAuthAttributes, 'Id' | 'UserName' | 'Password'> {}
export interface ILogInAuthInfoType extends ISignUpAuthInfoType {}

export interface ISignUpUserDTO
  extends Omit<IAuthAttributes, 'Id' | 'Password'> {}
export interface ISignUpAuthDTO
  extends Pick<IAuthAttributes, 'UserName' | 'Password'> {}
export interface ILogInDTO extends ISignUpAuthInfoType {}

export interface ITokenInfo extends IToken {}
export interface IPayload extends Pick<IToken, 'userName' | 'name' | 'role'> {}

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
