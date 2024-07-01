import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { sendResponse } from '../utils/responses';
import { IUserDTO } from '../interfaces/user';
import { UserDataRequest } from '../interfaces/auth';
import { AuthRequest } from '../interfaces/auth';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const usersDTO: IUserDTO[] = await userService.getAllUsers(req.query);
    sendResponse<IUserDTO[]>(req, res, 200, 'Got the users', usersDTO);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userDTO: IUserDTO = await userService.getUserById(req.params.id);
    sendResponse<IUserDTO>(req, res, 200, 'Got the user', userDTO);
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (
  req: UserDataRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.deleteUserById(req.params.id, req.user!.UserName);
    sendResponse(req, res, 200, 'User deleted');
  } catch (err) {
    next(err);
  }
};

export const updateUserById = async (
  req: UserDataRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.updateUserById(req.params.id, req.body);
    sendResponse(req, res, 200, 'User Updated');
  } catch (err) {
    next(err);
  }
};

export const updatePassword = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.updatePassword(req.tokenInfo!, req.body);
    sendResponse<string>(req, res, 200, 'Update password successful');
  } catch (err) {
    next(err);
  }
};
