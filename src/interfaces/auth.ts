interface IAuthAttributes {
  Id: number;
  UserName: string;
  Password: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: number;
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
