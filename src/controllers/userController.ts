import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { IUserType } from '../interfaces/user';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users: IUserType[] = await userService.getAllUsers();
    ///user na thakle eta ekta alada response deya lagte pare
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await userService.deleteUser(Number(req.params.id));
    res.json({ status: 'Deleted' });
  } catch (err) {
    console.log('User delete hoy nai');
    next(err);
  }
};

export const updateNameById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    await userService.updateNameById(Number(req.params.id), req.body.UserName);
    res.json({ status: 'Updated' });
  } catch (err) {
    console.log('User update hoy nai');
    next(err);
  }
};
