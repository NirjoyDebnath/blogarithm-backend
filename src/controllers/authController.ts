import * as authService from '../services/authService';
import { ISignUpUserInputType, IUserType } from '../interfaces/user';
import { Request, Response, NextFunction } from 'express';
import { ILogInAuthInfoType } from '../interfaces/auth';
import { sendResponse } from '../utils/responses';

export const signUp = async(req:Request, res: Response, next: NextFunction): Promise<void> =>{
    try{
        const signUpUserInput: ISignUpUserInputType = {
            UserName: req.body.UserName,
            Name: req.body.Name,
            Password: req.body.Password,
            Email: req.body.Email,
        };
        const user: IUserType = await authService.signUp(signUpUserInput);
        sendResponse(req, res, next, 200, user, 'Sign up successful', 'Success');
    } catch (err){
        next(err);
    }
}

export const logIn = async(req: Request, res:Response, next: NextFunction): Promise<void> =>{
    try{
        const logInUserInput: ILogInAuthInfoType = {
            UserName: req.body.UserName,
            Password: req.body.Password,
        };
    
        const logInStatus: string = await authService.logIn(logInUserInput);
        sendResponse(req, res, next, 200, undefined, logInStatus, 'Success');
    } catch(err){
        next(new Error('Not logged in'));
    }
}