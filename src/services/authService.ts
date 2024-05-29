import { ISignUpUserInputType } from "../interfaces/user";
import { ISignUpUserInfoType } from "../interfaces/user";
import { ILogInAuthInfoType, ISignUpAuthInfoType } from "../interfaces/auth";
import * as authRepository from "../repositories/authRepository";
import { IUserType } from "../interfaces/user";
import { hash } from '../utils/passwordWorks';
import { isHashMatched } from "../utils/passwordWorks";

export const signUp = async(signUpUserInput: ISignUpUserInputType) =>{
    const userInfo: ISignUpUserInfoType = {
        UserName: signUpUserInput.UserName,
        Email: signUpUserInput.Email,
        Name: signUpUserInput.Name,
        Role: 0,
        JoinDate: new Date()
    };
    const hashedPassword: string = await hash(signUpUserInput.Password);
    const signUpAuthInfo: ISignUpAuthInfoType = {UserName: signUpUserInput.UserName, Password: hashedPassword};
    const user: IUserType = await authRepository.signUp(userInfo, signUpAuthInfo);
    return user;
}

export const logIn = async(logInUserInput: ILogInAuthInfoType):Promise<string> =>{
    const passwordFromDB: string | undefined = await authRepository.logIn(logInUserInput);

    if(!passwordFromDB){
        return 'Not logged in';
    }
    else {
        const hashedPassword: string = await hash(passwordFromDB);
        const passwordMatched: boolean = await isHashMatched(logInUserInput.Password, hashedPassword);
        if(passwordMatched){
            return 'Logged in';
        }
        else {
            return 'Not logged in';
        }
    }
}