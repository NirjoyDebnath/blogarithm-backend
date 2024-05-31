import { IUser } from '../interfaces/user';
import * as userRepository from '../repositories/userRepository';

import jwt from 'jsonwebtoken';
import { ENV } from '../config/conf';

export const getAllUsers = async (): Promise<IUser[]> => {
  return userRepository.getAllUsers();
};

export const getUserById = async (id: number): Promise<IUser | undefined> => {
  return userRepository.getUserById(id);
};

export const deleteUserById = async (
  id: number,
  token: string | undefined
): Promise<void> => {
  if (!token) {
    throw new Error('You are not authorised');
  }
  const isValid = jwt.verify(token, ENV.SecretKey || 'hello', (err, data) => {
    console.log(err?.message, data);
  });

  // const user = await getUserById(id);
  // if (!user) {
  //   throw new Error('No such user');
  // }
  // await userRepository.deleteUserById(user.UserName);
};

deleteUserById(
  10,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Ik5pcmpveTkiLCJuYW1lIjoiTmlyam95IERlYm5hdGgiLCJyb2xlIjowLCJpYXQiOjE3MTcxNTY1OTAsImV4cCI6MTcxNzI0Mjk5MH0.LviAmklRAz5oDdvh_1n7NyYGg2e3bsFBnri4ui8TJ3M'
);

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
