import { Request, Response, NextFunction } from 'express';
import * as authController from '../../controllers/authController';
import * as authService from '../../services/authService';
import { sendResponse } from '../../utils/responses';
import { HttpStatusCode } from '../../enums/httpStatusCodes';
import {
  mockLogInUserInput,
  mockSignUpUserInput
} from '../../__mocks__/auth.mock';
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
    test('Should send HttpStatusCode.CREATED with successful signup', async () => {
      const mockReq: Partial<Request> = {
        body: mockSignUpUserInput
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
        HttpStatusCode.CREATED,
        'Sign up successful'
      );
    });
    test('Should send an error with unsuccessful signup', async () => {
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
    test('Should send HttpStatusCode.OK with successful login', async () => {
      const mockReq: Partial<Request> = {
        body: mockLogInUserInput
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
        HttpStatusCode.OK,
        'Log in successful',
        { token: mockToken }
      );
    });
    test('Should get an error with unsuccessful login', async () => {
      const mockReq: Partial<Request> = {
        body: mockLogInUserInput
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
