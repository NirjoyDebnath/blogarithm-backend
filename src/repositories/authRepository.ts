import { ILogInDTO, ISignUpUserInfoType } from '../interfaces/auth';
import { IAuth, ISignUpAuthInfoType } from '../interfaces/auth';
import { IUser } from '../interfaces/auth';
import db from '../database/db';
import { Knex } from 'knex';

export const signUp = async (
  signUpUserInfo: ISignUpUserInfoType,
  signUpAuthInfo: ISignUpAuthInfoType
): Promise<IUser> => {
  const trx: Knex.Transaction = await db.transaction();
  try {
    await trx('Auth').insert(signUpAuthInfo);
    const [Id]: number[] = await trx('Users').insert(signUpUserInfo);

    await trx.commit();

    const user: IUser = { Id, ...signUpUserInfo };
    return user;
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

export const logIn = async (
  logInAuthInfo: ILogInDTO
): Promise<IAuth | undefined> => {
  const auth = await db<IAuth>('auth')
    .select('*')
    .where('UserName', logInAuthInfo.UserName)
    .first();
  return auth;
};

export const getAuthByUserName = async (
  userName: string
): Promise<IAuth | undefined> => {
  const auth = await db<IAuth>('auth')
    .select('*')
    .where('UserName', userName)
    .first();
  return auth;
};

export const updatePassword = async (
  UserName: string,
  Password: string,
  PasswordModifiedAt: Date
): Promise<boolean> => {
  const isUpdated: boolean = await db('auth')
    .where('UserName', UserName)
    .update({ Password, PasswordModifiedAt });
  return isUpdated;
};
