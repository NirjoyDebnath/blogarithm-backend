import * as authService from '../services/authService';
import { signUpUserInputType, userType } from '../interfaces/user';
import { Request, Response, NextFunction } from 'express';
import { logInAuthInfoType } from '../interfaces/auth';

export const signUp = async(req:Request, res: Response, next: NextFunction): Promise<void> =>{
    try{
        const signUpUserInput: signUpUserInputType = {
            UserName: req.body.UserName,
            Name: req.body.Name,
            Password: req.body.Password,
            Email: req.body.Email,
        };
        const user: userType = await authService.signUp(signUpUserInput);
        res.json({status: "Sign Up Successful", user});
    } catch (err){
        next(err);
    }
}

export const logIn = async(req: Request, res:Response, next: NextFunction): Promise<void> =>{
    try{
        const logInUserInput: logInAuthInfoType = {
            UserName: req.body.UserName,
            Password: req.body.Password,
        };
    
        const logInStatus: string = await authService.logIn(logInUserInput);
        res.json({message: logInStatus})
    } catch(err){
        next(err);
    }
}