import {
  ISignUpUserInputType,
  ILogInDTO,
  ISignUpAuthDTO,
  ISignUpUserDTO,
  ITokenInfo,
  IUpdatePasswordUserInput,
  IUpdatePasswordUserInputDTO,
  ILogInAuthInputType
} from '../interfaces/auth';
import { IAuth } from '../interfaces/auth';
import * as authRepository from '../repositories/authRepository';
import { getHash } from '../utils/authHelper';
import { isHashMatched } from '../utils/authHelper';
import { getUserByUserName } from '../repositories/userRepository';
import {
  LogInDTO,
  SignUpAuthDTO,
  SignUpUserDTO,
  UpdatePasswordUserInputDTO
} from './DTOs/authDTO';
import { getToken } from '../utils/jwtHelper';
import { AppError } from '../utils/appError';

export const signUp = async (
  signUpUserInput: ISignUpUserInputType
): Promise<void> => {
  const signUpUserDTO: ISignUpUserDTO = new SignUpUserDTO(signUpUserInput);
  const signUpAuthDTO: ISignUpAuthDTO = new SignUpAuthDTO(signUpUserInput);
  signUpAuthDTO.Password = await getHash(signUpUserInput.Password);
  await authRepository.signUp(signUpUserDTO, signUpAuthDTO);
};

export const logIn = async (
  logInUserInput: ILogInAuthInputType
): Promise<string> => {
  const logInDTO: ILogInDTO = new LogInDTO(logInUserInput);
  const auth: IAuth | undefined = await authRepository.logIn(logInDTO);

  if (!auth) {
    throw new AppError(400, 'Invalid username');
  } else {
    const { UserName, Password } = auth;
    const isPasswordMatched: boolean = await isHashMatched(
      logInUserInput.Password,
      Password
    );
    if (isPasswordMatched) {
      const user = await getUserByUserName(UserName);

      if (!user) {
        throw new AppError(400, 'Unexpected error');
      }

      const token: string = await getToken(user);
      return token;
    } else {
      throw new AppError(401, 'Incorrect password');
    }
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
    const isUpdated: boolean = await authRepository.updatePassword(
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
