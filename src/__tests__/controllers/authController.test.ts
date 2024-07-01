import { Request, Response, NextFunction } from 'express';
import * as authController from '../../controllers/authController';
import * as authService from '../../services/authService';
import { sendResponse } from '../../utils/responses';
import { AuthRequest } from '../../interfaces/auth';
jest.mock('./../../services/authService', () => ({
  __esModule: true,
  signUp: jest.fn(),
  logIn: jest.fn(),
  updatePassword: jest.fn()
}));

jest.mock('./../../utils/responses', () => ({
  __esModule: true,
  sendResponse: jest.fn()
}));
describe('authController tester', () => {
  let mockRes: Partial<Response>;
  let mockNext: Partial<NextFunction>;

  beforeEach(() => {
    jest.resetAllMocks();
    mockRes = {};
    mockNext = jest.fn();
  });

  describe('authController signup', () => {
    test('Sign up should be successfull with valid imformations', async () => {
      const mockReq: Partial<Request> = {
        body: {
          UserName: 'Nirjoy',
          Name: 'Nirjoy Debnath',
          Email: 'Nirjoy@gmail.com',
          Password: '123'
        }
      };

      await authController.signUp(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(authService.signUp).toHaveBeenCalledWith(mockReq.body);
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        200,
        'Sign up successful'
      );
    });
    test('Sign up should be unsuccessfull with invalid imformations', async () => {
      const mockReq: Partial<Request> = {
        body: {
          UserName: 'Nirjoy',
          Name: 'Nirjoy Debnath',
          Email: 'Nirjoy@gmail.com'
        }
      };
      const mockError: Partial<Error> = {};

      (authService.signUp as jest.Mock).mockRejectedValue(mockError);

      await authController.signUp(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(authService.signUp).toHaveBeenCalledWith(mockReq.body);
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('authController login', () => {
    test('Log up should be successfull with valid imformations', async () => {
      const mockReq: Partial<Request> = {
        body: {
          UserName: 'Nirjoy',
          Password: '123'
        }
      };
      const mockToken: string = 'jwt token';

      (authService.logIn as jest.Mock).mockResolvedValue(mockToken);

      await authController.logIn(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(authService.logIn).toHaveBeenCalledWith(mockReq.body);
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        200,
        'Log in successful',
        mockToken
      );
    });
    test('Log up should be unsuccessfull with invalid imformations', async () => {
      const mockReq: Partial<Request> = {
        body: {
          UserName: 'Nirjoy',
          Password: '1234'
        }
      };
      const mockError: Partial<Error> = {};

      (authService.logIn as jest.Mock).mockRejectedValue(mockError);

      await authController.logIn(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(authService.logIn).toHaveBeenCalledWith(mockReq.body);
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
          userName: 'Nirjoy',
          name: 'Nirjoy Debnath',
          role: 0,
          iat: 10000000000,
          exp: 10000010000
        }
      };

      await authController.updatePassword(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(authService.updatePassword).toHaveBeenCalledWith(
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
          userName: 'Nirjoy',
          name: 'Nirjoy Debnath',
          role: 0,
          iat: 10000000000,
          exp: 10000010000
        }
      };
      const mockError: Partial<Error> = {};

      (authService.updatePassword as jest.Mock).mockRejectedValue(mockError);

      await authController.updatePassword(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(authService.updatePassword).toHaveBeenCalledWith(
        mockReq.tokenInfo,
        mockReq.body
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
