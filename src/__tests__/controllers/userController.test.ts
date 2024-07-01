import { Request, Response, NextFunction } from 'express';
import * as userController from '../../controllers/userController';
import * as userService from '../../services/userService';
import { sendResponse } from '../../utils/responses';
import { IUserDTO } from '../../interfaces/user';
import { UserDataRequest } from '../../interfaces/auth';

jest.mock('./../../services/userService', () => ({
  __esModule: true,
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  deleteUserByUserName: jest.fn(),
  updateUserById: jest.fn()
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
          Id: 1,
          UserName: 'Nirjoy',
          Email: 'Nirjoy@gmail.com',
          Name: 'Nirjoy Debnath'
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
        Id: 1,
        UserName: 'Nirjoy',
        Email: 'Nirjoy@gmail.com',
        Name: 'Nirjoy Debnath'
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

  describe('userController deleteStoryById', () => {
    test('Should get 200 and delete a user', async () => {
      const mockReq: Partial<UserDataRequest> = {
        user: {
          Id: 1,
          UserName: 'Nirjoy',
          Email: 'Nirjoy@gmail.com',
          Name: 'Nirjoy',
          JoinDate: new Date(),
          Role: 0
        }
      };

      await userController.deleteUserById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.deleteUserByUserName).toHaveBeenCalledWith(
        mockReq.user
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
          Id: 1,
          UserName: 'Nirjoy',
          Email: 'Nirjoy@gmail.com',
          Name: 'Nirjoy',
          JoinDate: new Date(),
          Role: 0
        }
      };
      const mockError: Partial<Error> = {};

      (userService.deleteUserByUserName as jest.Mock).mockRejectedValue(
        mockError
      );

      await userController.deleteUserById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.deleteUserByUserName).toHaveBeenCalledWith(
        mockReq.user
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
