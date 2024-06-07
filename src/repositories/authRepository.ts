import { ISignUpUserInfoType } from '../interfaces/auth';
import {
  IAuth,
  ILogInAuthInfoType,
  ISignUpAuthInfoType
} from '../interfaces/auth';
import { IUser } from '../interfaces/auth';
import db from '../database/db';
import { Knex } from 'knex';
import { AppError } from '../utils/appError';

export const signUp = async (
  userInfo: ISignUpUserInfoType,
  signUpAuthInfo: ISignUpAuthInfoType
): Promise<IUser> => {
  const trx: Knex.Transaction = await db.transaction();
  try {
    await trx('Auth').insert(signUpAuthInfo);
    const [Id]: number[] = await trx('Users').insert(userInfo);

    await trx.commit();

    const user: IUser = { Id, ...userInfo };
    return user;
  } catch (err) {
    await trx.rollback();
    throw new AppError(
      401,
      (err as AppError).sqlMessage || (err as AppError).message,
      (err as AppError).code
    );
  }
};

export const logIn = async (
  logInAuthInfo: ILogInAuthInfoType
): Promise<IAuth | undefined> => {
  const auth = await db<IAuth>('auth')
    .select('*')
    .where('UserName', logInAuthInfo.UserName)
    .first();
  return auth;
};
