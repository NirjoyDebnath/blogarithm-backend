import { IUser } from '../interfaces/user';
import db from '../database/db';

export const getAllUsers = async (): Promise<IUser[]> => {
  const users: IUser[] = await db<IUser>('Users').select('*');
  return users;
};

export const getUserById = async (id: number): Promise<IUser | undefined> => {
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

export const deleteUserByUserName = async (userName: string): Promise<boolean> => {
  const trx = await db.transaction();

  try {
    await trx('Users').where('UserName', userName).del();
    await trx('Auth').where('UserName', userName).del();
    await trx.commit();
    return true;
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

export const updateNameById = async (
  id: number,
  newUserName: string
): Promise<boolean> => {
  const isUpdated: boolean = await db('users')
    .where('Id', id)
    .update({ Name: newUserName });
  return isUpdated;
};

export const updateNameByUserName = async (
  userName: string,
  newUserName: string
): Promise<boolean> => {
  const isUpdated: boolean = await db('users')
    .where('UserName', userName)
    .update({ Name: newUserName });
  return isUpdated;
};
