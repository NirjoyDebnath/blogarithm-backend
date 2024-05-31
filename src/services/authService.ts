import { ISignUpUserInputType } from '../interfaces/auth';
import { ISignUpUserInfoType, IUser, IAuth } from '../interfaces/auth';
import { ILogInAuthInfoType, ISignUpAuthInfoType } from '../interfaces/auth';
import * as authRepository from '../repositories/authRepository';
import { hash } from '../utils/passwordWorks';
import { isHashMatched } from '../utils/passwordWorks';
import { getUserByUserName } from '../repositories/userRepository';
import { getToken } from '../utils/helper';

export const signUp = async (signUpUserInput: ISignUpUserInputType) => {
  const userInfo: ISignUpUserInfoType = {
    UserName: signUpUserInput.UserName,
    Email: signUpUserInput.Email,
    Name: signUpUserInput.Name,
    Role: 0,
    JoinDate: new Date()
  };
  const hashedPassword: string = await hash(signUpUserInput.Password);
  const signUpAuthInfo: ISignUpAuthInfoType = {
    UserName: signUpUserInput.UserName,
    Password: hashedPassword
  };
  const user: IUser = await authRepository.signUp(userInfo, signUpAuthInfo);
  return user;
};

export const logIn = async (
  logInUserInput: ILogInAuthInfoType
): Promise<string> => {
  const auth: IAuth | undefined = await authRepository.logIn(logInUserInput);

  if (!auth) {
    throw new Error('Invalid username');
  } else {
    //ekhane variable name change kora lagte pare
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
