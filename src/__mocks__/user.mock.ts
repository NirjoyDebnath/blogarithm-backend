import { Role } from '../enums/roles';
import {
  IUpdatePasswordUserInput,
  IUpdateUserInput,
  IUser,
  IUserDTO,
  IUserQueryParams
} from '../interfaces/user';

export const mockUser: IUser = {
  Id: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  UserName: 'Nirjoy',
  Email: 'Nirjoy@gmail.com',
  Name: 'Nirjoy Debnath',
  JoinDate: new Date(),
  Role: Role.user
};

export const mockUserName: string = 'Nirjoy';

export const mockUserDTO: IUserDTO = {
  Id: '4818b0ed-37a0-11ef-81cc-088fc31977ac',
  UserName: 'Nirjoy',
  Email: 'Nirjoy@gmail.com',
  Name: 'Nirjoy Debnath',
  _links: [
    {
      href: '/api/users/4818b0ed-37a0-11ef-81cc-088fc31977ac',
      rel: 'get user',
      type: 'GET'
    },
    {
      href: '/api/users/4818b0ed-37a0-11ef-81cc-088fc31977ac',
      rel: 'delete user',
      type: 'DELETE'
    },
    {
      href: '/api/users/4818b0ed-37a0-11ef-81cc-088fc31977ac',
      rel: 'update user',
      type: 'UPDATE'
    }
  ]
};

export const mockId: string = '4818b0ed-37a0-11ef-81cc-088fc31977ac';

export const mockUpdateUserInfo: IUpdateUserInput = {
  Name: 'New Name'
};

export const mockUpdatePasswordUserInput: IUpdatePasswordUserInput = {
  CurrentPassword: '123',
  NewPassword: '1234'
};

export const mockUpdatePasswordUserInputEqual: IUpdatePasswordUserInput = {
  CurrentPassword: '123',
  NewPassword: '123'
};

export const mockUserQueryParams: IUserQueryParams = {
  page: 1
};

export const mockUserQueryParamsNoPage: IUserQueryParams = {
  page: undefined
};
