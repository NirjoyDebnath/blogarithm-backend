import {
  IUser,
  IUserDTO,
  IUpdateUserInput,
  IUpdateUserDTO,
  IUserQueryParams
} from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';
import { UpdateUserDTO, UserDTO } from './DTOs/userDTO';
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

export const deleteUserByUserName = async (user: IUser): Promise<void> => {
  await userRepository.deleteUserByUserName(user.UserName);
};

export const updateUserById = async (
  id: number,
  updateUserInfo: IUpdateUserInput
): Promise<void> => {
  const updateUserDTO: IUpdateUserDTO = new UpdateUserDTO(updateUserInfo);
  const isUpdated: boolean = await userRepository.updateUserById(
    id,
    updateUserDTO
  );
  if (!isUpdated) {
    throw new AppError(500, 'Something went wrongg.');
  }
};
