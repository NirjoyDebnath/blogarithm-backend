import { signUpUserInputType } from "../interfaces/user";
import { signUpUserInfoType } from "../interfaces/user";
import { signUpAuthInfoType } from "../interfaces/auth";
import * as authRepository from "../repositories/authRepository";
import { userType } from "../interfaces/user";

export const signUp = async(userInput: signUpUserInputType) =>{
    const userInfo: signUpUserInfoType = {
        UserName: userInput.UserName,
        Email: userInput.Email,
        Name: userInput.Name,
        Role: 0,
        JoinDate: new Date()};
    const authInfo: signUpAuthInfoType = {UserName: userInput.UserName, Password: userInput.Password};
    const user: userType = await authRepository.signUp(userInfo, authInfo);
    return user;
}