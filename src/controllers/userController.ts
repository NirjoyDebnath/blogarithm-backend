import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { sendResponse } from '../utils/responses';
import { UserDTO } from '../interfaces/user';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users: UserDTO[] = await userService.getAllUsers();
    sendResponse<UserDTO[]>(req, res, 200, users, 'Got the users');
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
    const user: UserDTO = await userService.getUserById(Number(req.params.id));
    sendResponse<UserDTO>(req, res, 200, user, 'Got the users');
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
      Number(req.params.id),
      req.headers.authorization
    );
    sendResponse<undefined>(req, res, 200, undefined, 'User deleted');
  } catch (err) {
    next(err);
  }
};

export const updateNameById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.updateNameById(
      Number(req.params.id),
      req.headers.authorization,
      req.body
    );
    sendResponse<undefined>(req, res, 200, undefined, 'User Updated');
  } catch (err) {
    next(err);
  }
};
