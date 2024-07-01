import { ILogInDTO, ISignUpUserDTO } from '../interfaces/auth';
import { IAuth, ISignUpAuthDTO } from '../interfaces/auth';
import { IUser } from '../interfaces/auth';
import db from '../database/db';
import { Knex } from 'knex';

export const signUp = async (
  signUpUserInfo: ISignUpUserDTO,
  signUpAuthInfo: ISignUpAuthDTO
): Promise<IUser> => {
  const trx: Knex.Transaction = await db.transaction();
  try {
    await trx('Users').insert(signUpUserInfo);
    const user = await trx<IUser>('Users')
      .select('*')
      .where('UserName', signUpUserInfo.UserName)
      .first();
    await trx('Auth').insert({ UserId: user!.Id, ...signUpAuthInfo });

    await trx.commit();
    return user!;
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

export const getAuthByUserId = async (
  id: string
): Promise<IAuth | undefined> => {
  const auth = await db<IAuth>('auth').select('*').where('UserId', id).first();
  return auth;
};
