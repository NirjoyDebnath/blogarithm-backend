import {
  ISignUpUserInputType,
  LogInDTO,
  SignUpAuthDTO,
  SignupUserDTO
} from '../interfaces/auth';
import { IAuth } from '../interfaces/auth';
import { ILogInAuthInfoType } from '../interfaces/auth';
import * as authRepository from '../repositories/authRepository';
import { hash } from '../utils/authHelper';
import { isHashMatched } from '../utils/authHelper';
import { getUserByUserName } from '../repositories/userRepository';
import {
  getLogInDTO,
  getSignupAuthDTO,
  getSignupUserDTO
} from './DTOs/authDTO';
import { getToken } from '../utils/jwtHelper';
import { appError } from '../utils/appError';

export const signUp = async (
  signUpUserInput: ISignUpUserInputType
): Promise<void> => {
  const signUpUserDTO: SignupUserDTO = new getSignupUserDTO(signUpUserInput);
  const signUpAuthDTO: SignUpAuthDTO = new getSignupAuthDTO(signUpUserInput);
  signUpAuthDTO.Password = await hash(signUpUserInput.Password);
  await authRepository.signUp(signUpUserDTO, signUpAuthDTO);
};

export const logIn = async (
  logInUserInput: ILogInAuthInfoType
): Promise<string> => {
  const logInDTO: LogInDTO = new getLogInDTO(logInUserInput);
  const auth: IAuth | undefined = await authRepository.logIn(logInDTO);

  if (!auth) {
    throw new appError(400, 'Invalid username');
  } else {
    const { UserName, Password } = auth;
    const passwordMatched: boolean = await isHashMatched(
      logInUserInput.Password,
      Password
    );
    if (passwordMatched) {
      const user = await getUserByUserName(UserName);

      if (!user) {
        throw new appError(400, 'Unexpected error');
      }

      const token: string = await getToken(user);
      return token;
    } else {
      throw new appError(401, 'Incorrect password');
    }
  }
};
