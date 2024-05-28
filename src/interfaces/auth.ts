export interface signUpAuthInfoType{
    UserName: string,
    Password: string,
}

export interface authType extends signUpAuthInfoType{
    Id: number,
}

export interface logInAuthInfoType extends signUpAuthInfoType{}