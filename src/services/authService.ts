import { signUpUserInputType } from "../interfaces/user";
import { signUpUserInfoType } from "../interfaces/user";
import { logInAuthInfoType, signUpAuthInfoType } from "../interfaces/auth";
import * as authRepository from "../repositories/authRepository";
import { userType } from "../interfaces/user";

export const signUp = async(signUpUserInput: signUpUserInputType) =>{
    const userInfo: signUpUserInfoType = {
        UserName: signUpUserInput.UserName,
        Email: signUpUserInput.Email,
        Name: signUpUserInput.Name,
        Role: 0,
        JoinDate: new Date()};
    const signUpAuthInfo: signUpAuthInfoType = {UserName: signUpUserInput.UserName, Password: signUpUserInput.Password};
    const user: userType = await authRepository.signUp(userInfo, signUpAuthInfo);
    return user;
}

export const logIn = async(logInUserInput: logInAuthInfoType):Promise<string> =>{
    const passwordFromDB:string = await authRepository.logIn(logInUserInput);

    if(logInUserInput.Password === passwordFromDB){
        return 'Logged in';
    }
    else {
        return 'Not loged in';
    }
}