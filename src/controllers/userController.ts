import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { sendResponse } from '../utils/responses';
import { IUserDTO } from '../interfaces/user';
import { UserDataRequest } from '../interfaces/auth';
import { AuthRequest } from '../interfaces/auth';
import { HttpStatusCode } from '../enums/httpStatusCodes';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const usersDTO: IUserDTO[] = await userService.getAllUsers(req.query);
    sendResponse<IUserDTO[]>(
      req,
      res,
      HttpStatusCode.OK,
      'Got the users',
      usersDTO
    );
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
    sendResponse<IUserDTO>(
      req,
      res,
      HttpStatusCode.OK,
      'Got the user',
      userDTO
    );
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
    sendResponse(req, res, HttpStatusCode.OK, 'User deleted');
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
    sendResponse(req, res, HttpStatusCode.OK, 'User Updated');
  } catch (err) {
    next(err);
  }
};

export const updatePasswordById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await userService.updatePasswordById(
      req.params.id,
      req.tokenInfo!,
      req.body
    );
    sendResponse<string>(
      req,
      res,
      HttpStatusCode.OK,
      'Update password successful'
    );
  } catch (err) {
    next(err);
  }
};
