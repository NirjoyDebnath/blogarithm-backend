import * as authService from '../services/authService';
import { ISignUpUserInputType, IUser } from '../interfaces/auth';
import { Request, Response, NextFunction } from 'express';
import { ILogInAuthInfoType } from '../interfaces/auth';
import { sendResponse } from '../utils/responses';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const signUpUserInput: ISignUpUserInputType = {
      UserName: req.body.UserName,
      Name: req.body.Name,
      Password: req.body.Password,
      Email: req.body.Email
    };
    console.log(signUpUserInput);
    const user: IUser = await authService.signUp(signUpUserInput);
    sendResponse<IUser>(req, res, 200, user, 'Sign up successful');
  } catch (err) {
    next(err);
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const logInUserInput: ILogInAuthInfoType = {
      UserName: req.body.UserName,
      Password: req.body.Password
    };

    const logInStatus: string = await authService.logIn(logInUserInput);
    sendResponse<string>(req, res, 200, logInStatus, 'Log in successful');
  } catch (err) {
    next(err);
  }
};
