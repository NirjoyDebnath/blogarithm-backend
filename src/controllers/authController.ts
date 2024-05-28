import * as authService from '../services/authService';
import { signUpUserInputType, userType } from '../interfaces/user';
import { Request, Response } from 'express';

export const signUp = async(req:Request, res: Response): Promise<void> =>{
    const userInput: signUpUserInputType = {
        UserName: req.body.UserName,
        Name: req.body.Name,
        Password: req.body.Password,
        Email: req.body.Email,
    };
    const user: userType = await authService.signUp(userInput);
    res.json({status: "Sign Up Successful", user});
}