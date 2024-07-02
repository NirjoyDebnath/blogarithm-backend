import { mockAuth, mockHash, mockTokenInfo } from '../../__mocks__/auth.mock';
import {
  mockId,
  mockUpdatePasswordUserInput,
  mockUpdatePasswordUserInputEqual,
  mockUpdateUserInfo,
  mockUser,
  mockUserDTO,
  mockUserName,
  mockUserQueryParams,
  mockUserQueryParamsNoPage
} from '../../__mocks__/user.mock';
import { HttpStatusCode } from '../../enums/httpStatusCodes';
import { IUserDTO } from '../../interfaces/user';
import * as userRepository from '../../repositories/userRepository';
import * as authRepository from '../../repositories/authRepository';
import * as userService from '../../services/userService';
import { AppError } from '../../utils/appError';
import { getHash, isHashMatched } from '../../utils/authHelper';
jest.mock('./../../repositories/authRepository', () => ({
  __esModule: true,
  getAuthByUserId: jest.fn()
}));
jest.mock('./../../repositories/userRepository', () => ({
  __esModule: true,
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  updateUserById: jest.fn(),
  updatePasswordById: jest.fn(),
  deleteUserById: jest.fn()
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
describe('userService tester', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('userService getAllusers test', () => {
    test('should return all the users of page 1 by default', async () => {
      (userRepository.getAllUsers as jest.Mock).mockResolvedValue([mockUser]);

      const users: IUserDTO[] = await userService.getAllUsers(
        mockUserQueryParamsNoPage
      );
      expect(userRepository.getAllUsers).toHaveBeenCalled();
      expect(users).toEqual([mockUserDTO]);
    });

    test('should return all the users with specific page', async () => {
      (userRepository.getAllUsers as jest.Mock).mockResolvedValue([mockUser]);

      const users: IUserDTO[] =
        await userService.getAllUsers(mockUserQueryParams);
      expect(userRepository.getAllUsers).toHaveBeenCalled();
      expect(users).toEqual([mockUserDTO]);
    });

    test('should return an error if there is no user', async () => {
      (userRepository.getAllUsers as jest.Mock).mockResolvedValue([]);

      await expect(
        userService.getAllUsers(mockUserQueryParams)
      ).rejects.toThrow(new AppError(HttpStatusCode.NOT_FOUND, 'Not Found'));
      expect(userRepository.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('userService getUserById test', () => {
    test('should return a the user', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue(mockUser);

      const user: IUserDTO = await userService.getUserById(mockId);
      expect(userRepository.getUserById).toHaveBeenCalled();
      expect(user).toEqual(mockUserDTO);
    });

    test('should return an error if there is no user', async () => {
      (userRepository.getUserById as jest.Mock).mockResolvedValue(undefined);

      await expect(userService.getUserById(mockId)).rejects.toThrow(
        new AppError(HttpStatusCode.NOT_FOUND, 'Not Found')
      );
      expect(userRepository.getUserById).toHaveBeenCalled();
    });
  });

  describe('userService UpdateUserById test', () => {
    test('should Update a user details', async () => {
      (userRepository.updateUserById as jest.Mock).mockResolvedValue(true);

      await userService.updateUserById(mockId, mockUpdateUserInfo);

      expect(userRepository.updateUserById).toHaveBeenCalled();
    });

    test('should return an error if the user doesnt get updated', async () => {
      (userRepository.updateUserById as jest.Mock).mockResolvedValue(false);

      await expect(
        userService.updateUserById(mockId, mockUpdateUserInfo)
      ).rejects.toThrow(
        new AppError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Something went wrong.'
        )
      );

      expect(userRepository.updateUserById).toHaveBeenCalled();
    });
  });

  describe('userService UpdatePasswordById test', () => {
    test('should Update a users password', async () => {
      (userRepository.updatePasswordById as jest.Mock).mockResolvedValue(true);
      (authRepository.getAuthByUserId as jest.Mock).mockResolvedValue(mockAuth);
      (isHashMatched as jest.Mock).mockResolvedValue(true);
      (getHash as jest.Mock).mockResolvedValue(mockHash);

      await userService.updatePasswordById(
        mockId,
        mockTokenInfo,
        mockUpdatePasswordUserInput
      );
      expect(isHashMatched).toHaveBeenCalled();
      expect(getHash).toHaveBeenCalled();
      expect(userRepository.updatePasswordById).toHaveBeenCalled();
      expect(authRepository.getAuthByUserId).toHaveBeenCalled();
    });

    test('should throw an error if auth doesnt exist', async () => {
      (authRepository.getAuthByUserId as jest.Mock).mockResolvedValue(
        undefined
      );

      await expect(
        userService.updatePasswordById(
          mockId,
          mockTokenInfo,
          mockUpdatePasswordUserInput
        )
      ).rejects.toThrow(new AppError(HttpStatusCode.NOT_FOUND, 'Not Found'));
      expect(authRepository.getAuthByUserId).toHaveBeenCalled();
    });

    test('should throw an error if new password is same as current password', async () => {
      (authRepository.getAuthByUserId as jest.Mock).mockResolvedValue(mockAuth);

      await expect(
        userService.updatePasswordById(
          mockId,
          mockTokenInfo,
          mockUpdatePasswordUserInputEqual
        )
      ).rejects.toThrow(
        new AppError(HttpStatusCode.BAD_REQUEST, 'Bad request')
      );
      expect(authRepository.getAuthByUserId).toHaveBeenCalled();
    });

    test('should throw an error if user provides incorrect current password', async () => {
      (authRepository.getAuthByUserId as jest.Mock).mockResolvedValue(mockAuth);
      (isHashMatched as jest.Mock).mockResolvedValue(false);

      await expect(
        userService.updatePasswordById(
          mockId,
          mockTokenInfo,
          mockUpdatePasswordUserInput
        )
      ).rejects.toThrow(
        new AppError(HttpStatusCode.FORBIDDEN, 'Incorrect password')
      );
      expect(authRepository.getAuthByUserId).toHaveBeenCalled();
      expect(isHashMatched).toHaveBeenCalled();
    });

    test('should throw an error if something goes wrong with the database', async () => {
      (userRepository.updatePasswordById as jest.Mock).mockResolvedValue(false);
      (authRepository.getAuthByUserId as jest.Mock).mockResolvedValue(mockAuth);
      (isHashMatched as jest.Mock).mockResolvedValue(true);
      (getHash as jest.Mock).mockResolvedValue(mockHash);

      await expect(
        userService.updatePasswordById(
          mockId,
          mockTokenInfo,
          mockUpdatePasswordUserInput
        )
      ).rejects.toThrow(
        new AppError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Something went wrong.'
        )
      );

      expect(isHashMatched).toHaveBeenCalled();
      expect(getHash).toHaveBeenCalled();
      expect(userRepository.updatePasswordById).toHaveBeenCalled();
      expect(authRepository.getAuthByUserId).toHaveBeenCalled();
    });
  });

  describe('userService UpdatePasswordById test', () => {
    test('should delete a user', async () => {
      await userService.deleteUserById(mockId, mockUserName);
      expect(userRepository.deleteUserById).toHaveBeenCalled();
    });
  });
});
