import {
  IUser,
  UserDTO,
  IUpdateNameInput,
  UpdateNameDTO
} from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';
import { verifyToken } from '../utils/jwtHelper';
import { ITokenInfo } from '../interfaces/token';
import { getAllUsersDTO, getUpdateNameDTO, getUserDTO } from './DTOs/userDTO';
import { Role } from '../interfaces/user';
import { appError } from '../utils/appError';

export const getAllUsers = async (): Promise<UserDTO[]> => {
  const users: IUser[] = await userRepository.getAllUsers();
  const usersDTO: getAllUsersDTO = new getAllUsersDTO(users);
  return usersDTO.users;
};

export const getUserById = async (id: number): Promise<UserDTO> => {
  const user: IUser | undefined = await userRepository.getUserById(id);
  if (!user) {
    throw new Error('No user found');
  }
  const userDTO: UserDTO = new getUserDTO(user);
  return userDTO;
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
  newUserName: IUpdateNameInput
): Promise<boolean> => {
  const updateNameDTO: UpdateNameDTO = new getUpdateNameDTO(newUserName);
  const tokenInfo: ITokenInfo = await verifyToken(token);
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new appError(404, 'No such user');
  }
  if (tokenInfo.role === Role.admin) {
    const isUpdated: boolean = await userRepository.updateNameById(
      user.Id,
      updateNameDTO.Name
    );
    return isUpdated;
  } else {
    if (tokenInfo.userName === user.UserName) {
      const isUpdated: boolean = await userRepository.updateNameByUserName(
        user.UserName,
        updateNameDTO.Name
      );
      return isUpdated;
    } else {
      throw new appError(400, 'You are not authorised.');
    }
  }
};
