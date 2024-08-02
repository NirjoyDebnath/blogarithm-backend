import { Request, Response, NextFunction } from 'express';
import * as userController from '../../controllers/userController';
import * as userService from '../../services/userService';
import { sendResponse } from '../../utils/responses';
import { AuthRequest, UserDataRequest } from '../../interfaces/auth';
import { HttpStatusCode } from '../../enums/httpStatusCodes';
import {
  mockUpdatePasswordUserInput,
  mockUpdateUserInfo,
  mockUser,
  mockUserDTO
} from '../../__mocks__/user.mock';
import { mockParamsId, mockTokenInfo } from '../../__mocks__/auth.mock';

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
    test('Should get HttpStatusCode.OK with the users', async () => {
      const mockReq: Partial<Request> = {
        query: { page: '1' }
      };

      (userService.getAllUsers as jest.Mock).mockResolvedValue(mockUserDTO);

      await userController.getAllUsers(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.getAllUsers).toHaveBeenCalledWith(mockReq.query);
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.OK,
        'Got the users',
        mockUserDTO
      );
    });

    test('Should get error with unsuccessful get users', async () => {
      const mockReq: Partial<Request> = {
        query: { page: '1' }
      };
      const mockError: Partial<Error> = {};

      (userService.getAllUsers as jest.Mock).mockRejectedValue(mockError);

      await userController.getAllUsers(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.getAllUsers).toHaveBeenCalledWith(mockReq.query);
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('userController getUserById', () => {
    test('Should get HttpStatusCode.OK and get the user', async () => {
      const mockReq: Partial<Request> = {
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };

      (userService.getUserById as jest.Mock).mockResolvedValue(mockUserDTO);

      await userController.getUserById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.getUserById).toHaveBeenCalledWith(mockReq.params!.id);
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.OK,
        'Got the user',
        mockUserDTO
      );
    });
    test('Should get error with unsuccessful get user', async () => {
      const mockReq: Partial<Request> = {
        params: mockParamsId
      };
      const mockError: Partial<Error> = {};

      (userService.getUserById as jest.Mock).mockRejectedValue(mockError);

      await userController.getUserById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.getUserById).toHaveBeenCalledWith(mockReq.params!.id);
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('userController updateUserById', () => {
    test('Should get HttpStatusCode.OK with unsuccessful user update', async () => {
      const mockReq: Partial<UserDataRequest> = {
        body: mockUpdateUserInfo,
        params: mockParamsId
      };

      await userController.updateUserById(
        mockReq as UserDataRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.updateUserById).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.body
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.OK,
        'User Updated'
      );
    });
    test('Should get error with unsuccessful user update', async () => {
      const mockReq: Partial<UserDataRequest> = {
        body: mockUpdateUserInfo,
        params: mockParamsId
      };
      const mockError: Partial<Error> = {};

      (userService.updateUserById as jest.Mock).mockRejectedValue(mockError);

      await userController.updateUserById(
        mockReq as UserDataRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(userService.updateUserById).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.body
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('authController update password', () => {
    test('Should get HttpStatusCode.OK with unsuccessful password update', async () => {
      const mockReq: Partial<AuthRequest> = {
        body: mockUpdatePasswordUserInput,
        tokenInfo: mockTokenInfo,
        params: mockParamsId
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
        HttpStatusCode.OK,
        'Update password successful'
      );
    });
    test('Should get error with unsuccessful password update', async () => {
      const mockReq: Partial<AuthRequest> = {
        body: mockUpdatePasswordUserInput,
        tokenInfo: mockTokenInfo,
        params: mockParamsId
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
    test('Should get HttpStatusCode.OK with unsuccessful user delete', async () => {
      const mockReq: Partial<UserDataRequest> = {
        user: mockUser,
        params: mockParamsId
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
        HttpStatusCode.OK,
        'User deleted'
      );
    });
    test('Should get error with unsuccessful user delete', async () => {
      const mockReq: Partial<UserDataRequest> = {
        user: mockUser,
        params: mockParamsId
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
