import * as authService from '../services/authService';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/responses';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await authService.signUp(req.body);
    sendResponse(req, res, 200, 'Sign up successful');
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
    const logInStatus: string = await authService.logIn(req.body);
    sendResponse<string>(req, res, 200, 'Log in successful', logInStatus);
  } catch (err) {
    next(err);
  }
};
