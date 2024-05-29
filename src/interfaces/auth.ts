export interface ISignUpAuthInfoType{
    UserName: string,
    Password: string,
}

export interface IAuthType extends ISignUpAuthInfoType{
    Id: number,
}

export interface ILogInAuthInfoType extends ISignUpAuthInfoType{}