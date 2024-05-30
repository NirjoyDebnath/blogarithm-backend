import { ISignUpUserInputType } from "../interfaces/auth";
import { ISignUpUserInfoType, IUser, IAuth } from "../interfaces/auth";
import { ILogInAuthInfoType, ISignUpAuthInfoType } from "../interfaces/auth";
import * as authRepository from "../repositories/authRepository";
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
    const user: IUser = await authRepository.signUp(userInfo, signUpAuthInfo);
    return user;
}

export const logIn = async(logInUserInput: ILogInAuthInfoType):Promise<string> =>{
    const user: IAuth | undefined = await authRepository.logIn(logInUserInput);

    if(!user){
        throw new Error('Not logged in');
    }
    else {
        //ekhane variable name change kora lagte pare
        const passwordFromDB = user.Password;
        const hashedPassword: string = await hash(passwordFromDB);
        const passwordMatched: boolean = await isHashMatched(logInUserInput.Password, hashedPassword);
        if(passwordMatched){
            return 'Logged in';
        }
        else {
            throw new Error('Not logged in')
        }
    }
}