import { ISignUpUserInputType } from "../interfaces/user";
import { ISignUpUserInfoType } from "../interfaces/user";
import { ILogInAuthInfoType, ISignUpAuthInfoType } from "../interfaces/auth";
import * as authRepository from "../repositories/authRepository";
import { IUserType } from "../interfaces/user";

export const signUp = async(signUpUserInput: ISignUpUserInputType) =>{
    const userInfo: ISignUpUserInfoType = {
        UserName: signUpUserInput.UserName,
        Email: signUpUserInput.Email,
        Name: signUpUserInput.Name,
        Role: 0,
        JoinDate: new Date()};
    const signUpAuthInfo: ISignUpAuthInfoType = {UserName: signUpUserInput.UserName, Password: signUpUserInput.Password};
    const user: IUserType = await authRepository.signUp(userInfo, signUpAuthInfo);
    return user;
}

export const logIn = async(logInUserInput: ILogInAuthInfoType):Promise<string> =>{
    const passwordFromDB: string | undefined = await authRepository.logIn(logInUserInput);

    if(logInUserInput.Password === passwordFromDB){
        return 'Logged in';
    }
    else {
        return 'Not logged in';
    }
}