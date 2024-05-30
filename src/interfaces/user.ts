export interface ISignUpUserInfoType {
  UserName: string;
  Email: string;
  Name: string;
  JoinDate: Date;
  Role: number;
}

export interface IUserType extends ISignUpUserInfoType {
  Id: number;
}

export interface IUserTypeResponse extends ISignUpUserInfoType {}

export interface ISignUpUserInputType
  extends Omit<IUserType, 'Id' | 'JoinDate' | 'Role'> {
  Password: string;
}
