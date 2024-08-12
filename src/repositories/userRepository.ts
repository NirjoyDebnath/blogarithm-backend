import { IUpdateUserDTO, IUser } from '../interfaces/user';
import db from '../database/db';

export const getAllUsers = async (
  userPerPage: number,
  offset: number
): Promise<IUser[]> => {
  const users: IUser[] = await db<IUser>('users')
    .select('*')
    .limit(userPerPage)
    .offset(offset);
  return users;
};

export const getUserById = async (id: string): Promise<IUser | undefined> => {
  const user: IUser | undefined = await db<IUser>('users')
    .select('*')
    .where('Id', id)
    .first();
  return user;
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

export const updatePasswordById = async (
  id: string,
  Password: string,
  PasswordModifiedAt: Date
): Promise<boolean> => {
  const isUpdated: boolean = await db('auth')
    .where('UserId', id)
    .update({ Password, PasswordModifiedAt });
  return isUpdated;
};

export const deleteUserById = async (
  id: string,
  userName: string
): Promise<boolean> => {
  const trx = await db.transaction();

  try {
    await trx('users').where('Id', id).del();
    await trx('auth').where('UserName', userName).del();
    await trx.commit();
    return true;
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};
