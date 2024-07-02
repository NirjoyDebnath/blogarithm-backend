import { Request, Response, NextFunction } from 'express';
import * as authController from '../../controllers/authController';
import * as authService from '../../services/authService';
import { sendResponse } from '../../utils/responses';
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
});
