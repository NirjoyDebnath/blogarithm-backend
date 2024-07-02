import { Request, Response, NextFunction } from 'express';
import * as userController from '../../controllers/userController';
import * as userService from '../../services/userService';
import { sendResponse } from '../../utils/responses';
import { IUserDTO } from '../../interfaces/user';
import { AuthRequest, UserDataRequest } from '../../interfaces/auth';

jest.mock('./../../services/userService', () => ({
  __esModule: true,
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  deleteUserById: jest.fn(),
  updateUserById: jest.fn(),
  updatePasswordById: jest.fn()
}));

jest.mock('./../../utils/responses', () => ({
  __esModule: true,
  sendResponse: jest.fn()
}));

describe('userController tester', () => {
  let mockRes: Partial<Response>;
  let mockNext: Partial<NextFunction>;

  beforeEach(() => {
    jest.resetAllMocks();
    mockRes = {};
    mockNext = jest.fn();
  });

  describe('userController createUser', () => {
    test('Should get 200 with the users', async () => {
      const mockReq: Partial<Request> = {
        params: { page: '1' }
      };
      const mockUsers: IUserDTO[] = [
        {
          Id: '4818b0ec-37a0-11ef-81cc-088fc31977ac',
          UserName: 'Nirjoy',
          Email: 'Nirjoy@gmail.com',
          Name: 'Nirjoy Debnath',
          _links: [
            {
              href: '/api/users/4818b0ec-37a0-11ef-81cc-088fc31977ac',
              rel: 'get user',
              type: 'GET'
            },
            {
              href: '/api/users/4818b0ec-37a0-11ef-81cc-088fc31977ac',
              rel: 'delete user',
              type: 'DELETE'
            },
            {
              href: '/api/users/4818b0ec-37a0-11ef-81cc-088fc31977ac',
              rel: 'update user',
              type: 'UPDATE'
            }
          ]
        }
      ];

      (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUsers);

      await userController.getAllUsers(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.getAllUsers).toHaveBeenCalledWith(mockReq.params);
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        200,
        'Got the users',
        mockUsers
      );
    });
    test('Should not get the users', async () => {
      const mockReq: Partial<Request> = {
        params: { page: '1' }
      };
      const mockError: Partial<Error> = {};

      (userService.getAllUsers as jest.Mock).mockRejectedValue(mockError);

      await userController.getAllUsers(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.getAllUsers).toHaveBeenCalledWith(mockReq.params);
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('userController getUserById', () => {
    test('Should get 200 and get the user', async () => {
      const mockReq: Partial<Request> = {
        params: { id: '1' }
      };
      const mockUser: IUserDTO = {
        Id: '4818b0ec-37a0-11ef-81cc-088fc31977ac',
        UserName: 'Nirjoy',
        Email: 'Nirjoy@gmail.com',
        Name: 'Nirjoy Debnath',
        _links: [
          {
            href: '/api/users/4818b0ec-37a0-11ef-81cc-088fc31977ac',
            rel: 'get user',
            type: 'GET'
          },
          {
            href: '/api/users/4818b0ec-37a0-11ef-81cc-088fc31977ac',
            rel: 'delete user',
            type: 'DELETE'
          },
          {
            href: '/api/users/4818b0ec-37a0-11ef-81cc-088fc31977ac',
            rel: 'update user',
            type: 'UPDATE'
          }
        ]
      };

      (userService.getUserById as jest.Mock).mockResolvedValue(mockUser);

      await userController.getUserById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.getUserById).toHaveBeenCalledWith(
        Number(mockReq.params!.id)
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        200,
        'Got the user',
        mockUser
      );
    });
    test('Should get an error', async () => {
      const mockReq: Partial<Request> = {
        params: { id: '1' }
      };
      const mockError: Partial<Error> = {};

      (userService.getUserById as jest.Mock).mockRejectedValue(mockError);

      await userController.getUserById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.getUserById).toHaveBeenCalledWith(
        Number(mockReq.params!.id)
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('userController updateUserById', () => {
    test('Should get 200 and update a user', async () => {
      const mockReq: Partial<UserDataRequest> = {
        body: {
          Name: 'Nirjoy Debnath'
        },
        params: { id: '1' }
      };

      await userController.updateUserById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.updateUserById).toHaveBeenCalledWith(
        Number(mockReq.params!.id),
        mockReq.body
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        200,
        'User Updated'
      );
    });
    test('Should not update a user', async () => {
      const mockReq: Partial<UserDataRequest> = {
        body: {
          Title: 'Mock title',
          Description: 'Mock description'
        },
        params: { id: '1' }
      };
      const mockError: Partial<Error> = {};

      (userService.updateUserById as jest.Mock).mockRejectedValue(mockError);

      await userController.updateUserById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.updateUserById).toHaveBeenCalledWith(
        Number(mockReq.params!.id),
        mockReq.body
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('authController update password', () => {
    test('Update password should be successfull with correct old password and valid new password', async () => {
      const mockReq: Partial<AuthRequest> = {
        body: {
          CurrentPassword: '123',
          NewPassword: '1234'
        },
        tokenInfo: {
          id: '4818b0ec-37a0-11ef-81cc-088fc31977ac',
          userName: 'Nirjoy',
          name: 'Nirjoy Debnath',
          role: 0,
          iat: 10000000000,
          exp: 10000010000
        },
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };

      await userController.updatePasswordById(
        mockReq as AuthRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.updatePasswordById).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.tokenInfo,
        mockReq.body
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        200,
        'Update password successful'
      );
    });
    test('Update password should be unsuccessfull with incorrect old password and invalid new password', async () => {
      const mockReq: Partial<AuthRequest> = {
        body: {
          CurrentPassword: '321',
          NewPassword: '4321'
        },
        tokenInfo: {
          id: '4818b0ec-37a0-11ef-81cc-088fc31977ac',
          userName: 'Nirjoy',
          name: 'Nirjoy Debnath',
          role: 0,
          iat: 10000000000,
          exp: 10000010000
        },
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };
      const mockError: Partial<Error> = {};

      (userService.updatePasswordById as jest.Mock).mockRejectedValue(
        mockError
      );

      await userController.updatePasswordById(
        mockReq as AuthRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.updatePasswordById).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.tokenInfo,
        mockReq.body
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('userController deleteUserById', () => {
    test('Should get 200 and delete a user', async () => {
      const mockReq: Partial<UserDataRequest> = {
        user: {
          Id: '4818b0ec-37a0-11ef-81cc-088fc31977ac',
          UserName: 'Nirjoy',
          Email: 'Nirjoy@gmail.com',
          Name: 'Nirjoy',
          JoinDate: new Date(),
          Role: 0
        },
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };

      await userController.deleteUserById(
        mockReq as UserDataRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.deleteUserById).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.user!.UserName
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        200,
        'User deleted'
      );
    });
    test('Should not delete a user', async () => {
      const mockReq: Partial<UserDataRequest> = {
        user: {
          Id: '4818b0ec-37a0-11ef-81cc-088fc31977ac',
          UserName: 'Nirjoy',
          Email: 'Nirjoy@gmail.com',
          Name: 'Nirjoy',
          JoinDate: new Date(),
          Role: 0
        },
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };
      const mockError: Partial<Error> = {};

      (userService.deleteUserById as jest.Mock).mockRejectedValue(mockError);

      await userController.deleteUserById(
        mockReq as UserDataRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.deleteUserById).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.user!.UserName
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
