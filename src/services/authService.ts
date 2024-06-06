import {
  ISignUpUserInputType,
  LogInDTO,
  SignUpAuthDTO,
  SignupUserDTO
} from '../interfaces/auth';
import { IAuth } from '../interfaces/auth';
import { ILogInAuthInfoType } from '../interfaces/auth';
import * as authRepository from '../repositories/authRepository';
import { hash } from '../utils/passwordWorks';
import { isHashMatched } from '../utils/passwordWorks';
import { getUserByUserName } from '../repositories/userRepository';
import { getToken } from '../utils/helper';
import {
  getLogInDTO,
  getSignupAuthDTO,
  getSignupUserDTO
} from './DTOs/authDTO';

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
    throw new Error('Invalid username');
  } else {
    const { UserName, Password } = auth;
    const passwordMatched: boolean = await isHashMatched(
      logInUserInput.Password,
      Password
    );
    if (passwordMatched) {
      const user = await getUserByUserName(UserName);

      if (!user) {
        throw new Error('ekhane kokhono ashbe na');
      }

      const token: string = await getToken(user);
      return token;
    } else {
      throw new Error('Password invalid');
    }
  }
};
