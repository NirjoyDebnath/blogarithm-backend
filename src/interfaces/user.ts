export interface signUpUserInfoType{
    UserName: string,
    Email: string,
    Name: string,
    JoinDate: Date,
    Role: number,
}

export interface userType extends signUpUserInfoType {
    Id: number,
}

export interface signUpUserInputType extends Omit<userType, 'Id' | 'JoinDate' | 'Role'>{
    Password: string,
}

