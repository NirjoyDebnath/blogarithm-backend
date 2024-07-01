import * as authService from '../services/authService';
import { Request, Response, NextFunction } from 'express';
import { sendResponse } from '../utils/responses';
import { HttpStatusCode } from '../enums/httpStatusCodes';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await authService.signUp(req.body);
    sendResponse(req, res, HttpStatusCode.CREATED, 'Sign up successful');
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
    const token: string = await authService.logIn(req.body);
    sendResponse<object>(req, res, HttpStatusCode.OK, 'Log in successful', { token: token });
  } catch (err) {
    next(err);
  }
};
