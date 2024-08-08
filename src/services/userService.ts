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
import { getHash, isHashMatched } from '../utils/authHelper';
import { HttpStatusCode } from '../enums/httpStatusCodes';
import { UserPerPage } from '../config/constants';

export const getAllUsers = async (
  userQueryParams: IUserQueryParams
): Promise<IUserDTO[]> => {
  const page: number = userQueryParams.page || 1;
  const offset: number = Number(UserPerPage) * (page - 1);
  const userPerPage: number = Number(UserPerPage);
  const users: IUser[] = await userRepository.getAllUsers(userPerPage, offset);
  const usersDTO: IUserDTO[] = [];
  users.forEach((user) => {
    usersDTO.push(new UserDTO(user));
  });
  if (usersDTO.length === 0) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'Users Not Found');
  }
  return usersDTO;
};

export const getUserById = async (id: string): Promise<IUserDTO> => {
  const user: IUser | undefined = await userRepository.getUserById(id);
  if (!user) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'User Not Found');
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
    throw new AppError(
      HttpStatusCode.INTERNAL_SERVER_ERROR,
      'Something went wrong.'
    );
  }
};

export const updatePasswordById = async (
  id: string,
  tokenInfo: ITokenInfo,
  updatePasswordUserInput: IUpdatePasswordUserInput
): Promise<void> => {
  const auth: IAuth | undefined = await authRepository.getAuthByUserId(id);
  if (!auth) {
    throw new AppError(HttpStatusCode.NOT_FOUND, 'Not Found');
  }
  const updatePasswordUserInputDTO: IUpdatePasswordUserInputDTO =
    new UpdatePasswordUserInputDTO(updatePasswordUserInput);
  const { CurrentPassword, NewPassword } = updatePasswordUserInputDTO;
  if (CurrentPassword === NewPassword) {
    throw new AppError(HttpStatusCode.BAD_REQUEST, 'Bad request');
  }
  const isPasswordMatched: boolean = await isHashMatched(
    CurrentPassword,
    auth.Password
  );
  if (isPasswordMatched) {
    const passwordModifiedAt = new Date();
    const hashedNewPassword: string = await getHash(NewPassword);
    const isUpdated: boolean = await userRepository.updatePasswordById(
      id,
      hashedNewPassword,
      passwordModifiedAt
    );
    if (!isUpdated) {
      throw new AppError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        'Something went wrong.'
      );
    }
  } else {
    throw new AppError(HttpStatusCode.FORBIDDEN, 'Incorrect password');
  }
};

export const deleteUserById = async (
  id: string,
  userName: string
): Promise<void> => {
  await userRepository.deleteUserById(id, userName);
};
