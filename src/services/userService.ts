import { IUser } from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';
import { verifyToken } from '../utils/helper';
import { ITokenInfo } from '../interfaces/token';
import { IRole } from '../interfaces/user';
import { getAllUsersDTO, userDTO } from './DTOs/dtoHealper';

export const getAllUsers = async (): Promise<userDTO[]> => {
  const users: IUser[] = await userRepository.getAllUsers();
  const usersDTO: getAllUsersDTO = new getAllUsersDTO(users);
  return usersDTO.users;
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
