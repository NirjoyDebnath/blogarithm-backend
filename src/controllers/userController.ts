import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { sendResponse } from '../utils/responses';
import { IUserDTO } from '../interfaces/user';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const usersDTO: IUserDTO[] = await userService.getAllUsers(req.params);
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
    const userDTO: IUserDTO = await userService.getUserById(
      Number(req.params.id)
    );
    sendResponse<IUserDTO>(req, res, 200, 'Got the user', userDTO);
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
    sendResponse(req, res, 200, 'User deleted');
  } catch (err) {
    next(err);
  }
};

export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.updateUserById(
      Number(req.params.id),
      req.headers.authorization,
      req.body
    );
    sendResponse(req, res, 200, 'User Updated');
  } catch (err) {
    next(err);
  }
};
