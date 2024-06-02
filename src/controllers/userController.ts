import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { IUser } from '../interfaces/user';
import { sendResponse } from '../utils/responses';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: IUser[] = await userService.getAllUsers();
    ///user na thakle eta ekta alada response deya lagte pare
    sendResponse<IUser[]>(req, res, next, 200, users, 'Got the users');
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.deleteUserById(
      Number(req.params.id)
    );
    sendResponse<undefined>(req, res, next, 200, undefined, 'User deleted');
  } catch (err) {
    console.log('User delete hoy nai');
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.deleteUser(
      req.headers.authorization
    );
    sendResponse<undefined>(req, res, next, 200, undefined, 'User deleted');
  } catch (err) {
    console.log('User delete hoy nai');
    next(err);
  }
};

export const updateNameById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.updateNameById(Number(req.params.id), req.body.UserName);
    sendResponse<undefined>(req, res, next, 200, undefined, 'User Updated');
  } catch (err) {
    console.log('User update hoy nai');
    next(err);
  }
};
