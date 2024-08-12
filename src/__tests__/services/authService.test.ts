import {
  mockAuth,
  mockHash,
  mockLogInUserInput,
  mockSignUpUserInput,
  mockToken
} from '../../__mocks__/auth.mock';
import { mockUser } from '../../__mocks__/user.mock';
import * as authService from '../../services/authService';
import * as authRepository from '../../repositories/authRepository';
import * as userRepository from '../../repositories/userRepository';
import { getHash, isHashMatched } from '../../utils/authHelper';
import { getToken } from '../../utils/jwtHelper';
import { HttpStatusCode } from '../../enums/httpStatusCodes';
import { AppError } from '../../utils/appError';

jest.mock('./../../repositories/authRepository', () => ({
  __esModule: true,
  signUp: jest.fn(),
  logIn: jest.fn()
}));
jest.mock('./../../repositories/userRepository', () => ({
  __esModule: true,
  getUserById: jest.fn()
}));
jest.mock('./../../utils/authHelper', () => ({
  __esModule: true,
  getHash: jest.fn(),
  isHashMatched: jest.fn()
}));
jest.mock('./../../utils/jwtHelper', () => ({
  __esModule: true,
  getToken: jest.fn()
}));

describe('authService tester', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('authService signUp test', () => {
    test('Should call the repository for signUp', async () => {
      (getHash as jest.Mock).mockResolvedValue(mockHash);

      await authService.signUp(mockSignUpUserInput);

      expect(getHash).toHaveBeenCalledWith(mockSignUpUserInput.Password);
      expect(authRepository.signUp).toHaveBeenCalled();
    });

    describe('authService Login test', () => {
      test('Should call the repository for login and returns a token in successful login', async () => {
        (authRepository.logIn as jest.Mock).mockResolvedValue(mockAuth);
        (isHashMatched as jest.Mock).mockResolvedValue(true);
        (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);
        (getToken as jest.Mock).mockResolvedValue(mockToken);

        const token: string = await authService.logIn(mockLogInUserInput);

        expect(authRepository.logIn).toHaveBeenCalled();
        expect(token).toEqual(mockToken);
      });

      test('Should throw error for invalid username', async () => {
        (authRepository.logIn as jest.Mock).mockResolvedValue(undefined);

        await expect(authService.logIn(mockLogInUserInput)).rejects.toThrow(
          new AppError(HttpStatusCode.BAD_REQUEST, 'Incorrect Username or Password')
        );

        expect(authRepository.logIn).toHaveBeenCalled();
      });

      test('Should throw error for if user gives wrong password', async () => {
        (authRepository.logIn as jest.Mock).mockResolvedValue(mockAuth);
        (isHashMatched as jest.Mock).mockResolvedValue(false);

        await expect(authService.logIn(mockLogInUserInput)).rejects.toThrow(
          new AppError(HttpStatusCode.UNAUTHORIZED, 'Incorrect Username or Password')
        );

        expect(authRepository.logIn).toHaveBeenCalled();
      });

      test('Should throw error for if user is not found', async () => {
        (authRepository.logIn as jest.Mock).mockResolvedValue(mockAuth);
        (isHashMatched as jest.Mock).mockResolvedValue(true);
        (userRepository.getUserById as jest.Mock).mockResolvedValue(undefined);

        await expect(authService.logIn(mockLogInUserInput)).rejects.toThrow(
          new AppError(HttpStatusCode.BAD_REQUEST, 'Unexpected error')
        );

        expect(authRepository.logIn).toHaveBeenCalled();
      });
    });
  });
});
