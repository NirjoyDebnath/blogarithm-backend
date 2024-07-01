import { IUpdateUserDTO, IUser } from '../interfaces/user';
import db from '../database/db';

export const getAllUsers = async (
  userPerPage: number,
  offset: number
): Promise<IUser[]> => {
  const users: IUser[] = await db<IUser>('Users')
    .select('*')
    .limit(userPerPage)
    .offset(offset);
  return users;
};

export const getUserById = async (id: string): Promise<IUser | undefined> => {
  const users: IUser | undefined = await db<IUser>('Users')
    .select('*')
    .where('Id', id)
    .first();
  return users;
};

export const getUserByUserName = async (
  userName: string
): Promise<IUser | undefined> => {
  const users: IUser | undefined = await db<IUser>('Users')
    .select('*')
    .where('UserName', userName)
    .first();
  return users;
};

export const updateUserById = async (
  id: string,
  updateUserDTO: IUpdateUserDTO
): Promise<boolean> => {
  const isUpdated: boolean = await db('users')
    .where('Id', id)
    .update(updateUserDTO);
  return isUpdated;
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

export const deleteUserById = async (
  id: string,
  userName: string
): Promise<boolean> => {
  const trx = await db.transaction();

  try {
    await trx('Users').where('Id', id).del();
    await trx('Auth').where('UserName', userName).del();
    await trx.commit();
    return true;
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};
