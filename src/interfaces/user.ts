interface IUserAttributes{
    Id: number,
    UserName: string,
    Email: string,
    Name: string,
    JoinDate: Date,
    Role: number,
}

export interface IUser extends IUserAttributes{}
