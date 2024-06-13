import {
  IUser,
  IUserDTO,
  IUpdateUserInput,
  IUpdateUserDTO,
  IUserQueryParams
} from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';
import { verifyToken } from '../utils/jwtHelper';
import { ITokenInfo } from '../interfaces/token';
import { UpdateUserDTO, UserDTO } from './DTOs/userDTO';
import { Role } from '../interfaces/user';
import { AppError } from '../utils/appError';
import { ENV } from '../config/conf';

export const getAllUsers = async (
  userQueryParams: IUserQueryParams
): Promise<IUserDTO[]> => {
  const page: number = userQueryParams.page || 1;
  const offset: number = Number(ENV.StoryPerPage) * (page - 1);
  const storyPerPage: number = Number(ENV.StoryPerPage);
  const users: IUser[] = await userRepository.getAllUsers(storyPerPage, offset);
  const usersDTO: IUserDTO[] = [];
  users.forEach((user) => {
    usersDTO.push(new UserDTO(user));
  });
  return usersDTO;
};

export const getUserById = async (id: number): Promise<IUserDTO> => {
  const user: IUser | undefined = await userRepository.getUserById(id);
  if (!user) {
    throw new AppError(404, 'No user found');
  }
  const userDTO: IUserDTO = new UserDTO(user);
  return userDTO;
};

export const deleteUserById = async (
  id: number,
  token: string | undefined
): Promise<void> => {
  const tokenInfo: ITokenInfo = await verifyToken(token);
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new AppError(404, 'No such user');
  }
  if (tokenInfo.role === Role.admin) {
    await userRepository.deleteUserByUserName(user.UserName);
  } else {
    if (tokenInfo.userName === user.UserName) {
      await userRepository.deleteUserByUserName(user.UserName);
    } else {
      throw new AppError(401, 'You are not authorised.');
    }
  }
};

export const updateUserById = async (
  id: number,
  token: string | undefined,
  updateUserInfo: IUpdateUserInput
): Promise<boolean> => {
  const updateUserDTO: IUpdateUserDTO = new UpdateUserDTO(updateUserInfo);
  const tokenInfo: ITokenInfo = await verifyToken(token);
  const user = await userRepository.getUserById(id);
  if (!user) {
    throw new AppError(404, 'No such user');
  }
  if (tokenInfo.role === Role.admin) {
    const isUpdated: boolean = await userRepository.updateUserById(
      user.Id,
      updateUserDTO
    );
    return isUpdated;
  } else {
    if (tokenInfo.userName === user.UserName) {
      const isUpdated: boolean = await userRepository.updateUserById(
        user.Id,
        updateUserDTO
      );
      return isUpdated;
    } else {
      throw new AppError(401, 'You are not authorised.');
    }
  }
};
