import { IUser } from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';
import { verifyToken } from '../utils/helper';
import { ITokenInfo } from '../interfaces/token';
import { IRole } from '../interfaces/user';

export const getAllUsers = async (): Promise<IUser[]> => {
  return userRepository.getAllUsers();
};

export const getUserById = async (id: number): Promise<IUser | undefined> => {
  return userRepository.getUserById(id);
};

export const deleteUserById = async (
  id: number,
  token: string | undefined
): Promise<void> => {
  const tokenInfo: ITokenInfo = await verifyToken(token);
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new Error('No such user');
  }
  if (tokenInfo.role === IRole.admin) {
    await userRepository.deleteUserByUserName(user.UserName);
  } else {
    if (tokenInfo.userName === user.UserName) {
      await userRepository.deleteUserByUserName(user.UserName);
    } else {
      throw new Error('You are not authorized for this action');
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
    throw new Error('No such user');
  }
  if (tokenInfo.role === IRole.admin) {
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
      throw new Error('You are not authorized for this action');
    }
  }
};
