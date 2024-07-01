import {
  IUser,
  IUserDTO,
  IUpdateUserInput,
  IUpdateUserDTO,
  IUserQueryParams,
  IUpdatePasswordUserInput,
  IUpdatePasswordUserInputDTO
} from '../interfaces/user';
import { IAuth, ITokenInfo } from '../interfaces/auth';
import * as userRepository from '../repositories/userRepository';
import * as authRepository from '../repositories/authRepository';
import { UpdateUserDTO, UserDTO } from './DTOs/userDTO';
import { UpdatePasswordUserInputDTO } from './DTOs/userDTO';
import { AppError } from '../utils/appError';
import { ENV } from '../config/conf';
import { getHash, isHashMatched } from '../utils/authHelper';

export const getAllUsers = async (
  userQueryParams: IUserQueryParams
): Promise<IUserDTO[]> => {
  const page: number = userQueryParams.page || 1;
  const offset: number = Number(ENV.UserPerPage) * (page - 1);
  const userPerPage: number = Number(ENV.UserPerPage);
  const users: IUser[] = await userRepository.getAllUsers(userPerPage, offset);
  const usersDTO: IUserDTO[] = [];
  users.forEach((user) => {
    usersDTO.push(new UserDTO(user));
  });
  if (usersDTO.length === 0) {
    throw new AppError(404, 'No users found');
  }
  return usersDTO;
};

export const getUserById = async (id: string): Promise<IUserDTO> => {
  const user: IUser | undefined = await userRepository.getUserById(id);
  if (!user) {
    throw new AppError(404, 'No user found');
  }
  const userDTO: IUserDTO = new UserDTO(user);
  return userDTO;
};

export const updateUserById = async (
  id: string,
  updateUserInfo: IUpdateUserInput
): Promise<void> => {
  const updateUserDTO: IUpdateUserDTO = new UpdateUserDTO(updateUserInfo);
  const isUpdated: boolean = await userRepository.updateUserById(
    id,
    updateUserDTO
  );
  if (!isUpdated) {
    throw new AppError(500, 'Something went wrong.');
  }
};

export const updatePassword = async (
  tokenInfo: ITokenInfo,
  updatePasswordUserInput: IUpdatePasswordUserInput
): Promise<void> => {
  const auth: IAuth | undefined = await authRepository.getAuthByUserName(
    tokenInfo.userName
  );
  if (!auth) {
    throw new AppError(404, 'Bad request');
  }
  const updatePasswordUserInputDTO: IUpdatePasswordUserInputDTO =
    new UpdatePasswordUserInputDTO(updatePasswordUserInput);
  const { CurrentPassword, NewPassword } = updatePasswordUserInputDTO;
  if (CurrentPassword === NewPassword) {
    throw new AppError(400, 'Bad request');
  }
  const isPasswordMatched: boolean = await isHashMatched(
    CurrentPassword,
    auth.Password
  );
  if (isPasswordMatched) {
    const passwordModifiedAt = new Date();
    const hashedNewPassword: string = await getHash(NewPassword);
    const isUpdated: boolean = await userRepository.updatePassword(
      auth.UserName,
      hashedNewPassword,
      passwordModifiedAt
    );
    if (!isUpdated) {
      throw new AppError(500, 'Something went wrong.');
    }
  } else {
    throw new AppError(403, 'Incorrect password');
  }
};

export const deleteUserById = async (
  id: string,
  userName: string
): Promise<void> => {
  await userRepository.deleteUserById(id, userName);
};
