import {
  IUser,
  IUserDTO,
  IUpdateUserInput,
  IUpdateUserDTO,
  IUserQueryParams
} from '../interfaces/user';
import {
  IAuth,
  ITokenInfo,
  IUpdatePasswordUserInput,
  IUpdatePasswordUserInputDTO
} from '../interfaces/auth';
import * as userRepository from '../repositories/userRepository';
import * as authRepository from '../repositories/authRepository';
import { UpdateUserDTO, UserDTO } from './DTOs/userDTO';
import { UpdatePasswordUserInputDTO } from './DTOs/authDTO';
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

export const updatePassword = async (
  tokenInfo: ITokenInfo,
  updatePasswordUserInput: IUpdatePasswordUserInput
): Promise<void> => {
  const auth: IAuth | undefined = await authRepository.getAuthByUserName(
    tokenInfo.userName
  );
  if (!auth) {
    throw new AppError(400, 'Bad request');
  }
  const updatePasswordUserInputDTO: IUpdatePasswordUserInputDTO =
    new UpdatePasswordUserInputDTO(updatePasswordUserInput);
  const { CurrentPassword, NewPassword } = updatePasswordUserInputDTO;
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
      throw new AppError(500, 'Something went wrongg.');
    }
  } else {
    throw new AppError(401, 'Incorrect password');
  }
};
