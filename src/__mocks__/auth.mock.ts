import {
  IAuth,
  ILogInAuthInputType,
  ISignUpUserInputType,
  ITokenInfo
} from '../interfaces/auth';

export const mockSignUpUserInput: ISignUpUserInputType = {
  UserName: 'Nirjoy',
  Password: '123',
  Email: 'Nirjoy@gmail.com',
  Name: 'Nirjoy Debnath'
};

export const mockHash: string =
  '$2a$12$iJXz3KWHqLFudH7bpT6AaO/zqNHNjGcoHxbM/TcJoqWrjUuLAkCje';

export const mockPassword: string = 'abc';

export const mockLogInUserInput: ILogInAuthInputType = {
  UserName: 'Nirjoy',
  Password: '123'
};
export const mockAuth: IAuth = {
  Id: '4818b0ec-37a0-11ef-81cc-088fc31977ac',
  UserId: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  UserName: 'Nirjoy',
  Password: '123',
  PasswordModifiedAt: new Date()
};

export const mockToken: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM5MzE2YTA2LTM3OWQtMTFlZi04MWNjLTA4OGZjMzE5NzdhYyIsInVzZXJOYW1lIjoiTmlyam95IiwibmFtZSI6Ik5pcmpveSBEZWJuYXRoIiwicm9sZSI6MCwiaWF0IjoxNzE5ODMzNjM5LCJleHAiOjE3MjAwMDY0Mzl9.lVOTGPTgNIhfmlk_m8nDOLbusa-Rb3b4E3PWS6nz3Ng';

export const mockTokenInfo: ITokenInfo = {
  id: '4818b0ec-37a0-11ef-81cc-088fc31977ac',
  userName: 'Nirjoy',
  name: 'Nirjoy Debnath',
  role: 0,
  iat: 10000000000,
  exp: 10000010000
};

export const mockParamsId = {
  id: '57298asd1-37a0-11ef-81cc-088fc31977ac'
};
