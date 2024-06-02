import { IUser } from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';
import { verifyToken } from '../utils/helper';
import { ITokenInfo } from '../interfaces/token';

import jwt from 'jsonwebtoken';
import { ENV } from '../config/conf';

export const getAllUsers = async (): Promise<IUser[]> => {
  return userRepository.getAllUsers();
};

export const getUserById = async (id: number): Promise<IUser | undefined> => {
  return userRepository.getUserById(id);
};

export const deleteUserById = async (
  id: number,
): Promise<void> => {
  const user:IUser | undefined = await getUserById(id);
  if (!user) {
    throw new Error('No such user');
  }
  await userRepository.deleteUserByUserName(user.UserName);
};

export const deleteUser = async (
  token: string | undefined
): Promise<void> => {
  const tokenInfo: ITokenInfo = await verifyToken(token);
  const user:IUser | undefined = await userRepository.getUserByUserName(tokenInfo.userName);
  if (!user) {
    throw new Error('No such user');
  }
  await userRepository.deleteUserByUserName(user.UserName);
};

export const updateNameById = async (
  id: number,
  newUserName: string
): Promise<boolean> => {
  const isUpdated: boolean = await userRepository.updateNameById(
    id,
    newUserName
  );
  if (!isUpdated) {
    throw new Error('Not Updated');
  }
  return isUpdated;
};
