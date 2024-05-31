import { IUser } from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';

export const getAllUsers = async (): Promise<IUser[]> => {
  return userRepository.getAllUsers();
};

export const getUserById = async (id: number): Promise<IUser | undefined> => {
  return userRepository.getUserById(id);
};

export const deleteUser = async (id: number): Promise<void> => {
  const user = await getUserById(id);
  if (!user) {
    throw new Error('No such user');
  }
  await userRepository.deleteUser(user.UserName);
};

export const updateNameById = async (
  id: number,
  newUserName: string
): Promise<boolean> => {
  const isUpdated: boolean = await userRepository.updateNameById(
    id,
    newUserName
  );
  if (!isUpdated) {
    throw new Error('Not Updated');
  }
  return isUpdated;
};
