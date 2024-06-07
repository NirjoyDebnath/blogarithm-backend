import { IUser } from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';
import { verifyToken } from '../utils/jwtHelper';
import { ITokenInfo } from '../interfaces/token';
import { Role } from '../interfaces/user';
import { appError } from '../utils/appError';

export const getAllUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await userRepository.getAllUsers();
  return users;
};

export const getUserById = async (id: number): Promise<IUser | undefined> => {
  const user: IUser | undefined = await userRepository.getUserById(id);
  return user;
};

export const deleteUserById = async (
  id: number,
  token: string | undefined
): Promise<void> => {
  const tokenInfo: ITokenInfo = await verifyToken(token);
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new appError(404, 'No such user');
  }
  if (tokenInfo.role === Role.admin) {
    await userRepository.deleteUserByUserName(user.UserName);
  } else {
    if (tokenInfo.userName === user.UserName) {
      await userRepository.deleteUserByUserName(user.UserName);
    } else {
      throw new appError(400, 'You are not authorised.');
    }
  }
};

export const updateNameById = async (
  id: number,
  token: string | undefined,
  newUserName: string
): Promise<boolean> => {
  const tokenInfo: ITokenInfo = await verifyToken(token);
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new appError(404, 'No such user');
  }
  if (tokenInfo.role === Role.admin) {
    const isUpdated: boolean = await userRepository.updateNameById(
      user.Id,
      newUserName
    );
    return isUpdated;
  } else {
    if (tokenInfo.userName === user.UserName) {
      const isUpdated: boolean = await userRepository.updateNameByUserName(
        user.UserName,
        newUserName
      );
      return isUpdated;
    } else {
      throw new appError(400, 'You are not authorised.');
    }
  }
};
