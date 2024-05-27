

export interface userType {
    Id: number,
    UserName: string,
    Email: string,
    Password: string,
}

export interface userInputType extends Omit<userType,'Id'>{}

