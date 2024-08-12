import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../../interfaces/auth';
import { mockParamsId, mockTokenInfo } from '../../__mocks__/auth.mock';
import * as likeService from '../../services/likeService';
import * as likeController from '../../controllers/likeController';
import { HttpStatusCode } from '../../enums/httpStatusCodes';
import { sendResponse } from '../../utils/responses';
import { mockLikesDTO } from '../../__mocks__/like.mock';

jest.mock('./../../services/likeService', () => ({
  __esModule: true,
  likeStory: jest.fn(),
  getLikesByStoryId: jest.fn(),
  unlikeStory: jest.fn()
}));

jest.mock('./../../utils/responses', () => ({
  __esModule: true,
  sendResponse: jest.fn()
}));

describe('likeController tester', () => {
  let mockRes: Partial<Response>;
  let mockNext: Partial<NextFunction>;

  beforeEach(() => {
    jest.resetAllMocks();
    mockRes = {};
    mockNext = jest.fn();
  });

  describe('likeController likeStory', () => {
    test('Should get HttpStatusCode.CREATED with like story', async () => {
      const mockReq: Partial<AuthRequest> = {
        tokenInfo: mockTokenInfo,
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };

      await likeController.likeStory(
        mockReq as AuthRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(likeService.likeStory).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.tokenInfo
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.CREATED,
        'Liked story'
      );
    });

    test('Should get error with unsuccessful like story', async () => {
      const mockReq: Partial<AuthRequest> = {
        tokenInfo: mockTokenInfo,
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };

      const mockError: Partial<Error> = {};

      (likeService.likeStory as jest.Mock).mockRejectedValue(mockError);

      await likeController.likeStory(
        mockReq as AuthRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(likeService.likeStory).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.tokenInfo
      );
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('likeController getLikesByStoryId', () => {
    test('Should get HttpStatusCode.OK with all likes', async () => {
      const mockReq: Partial<Request> = {
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };

      (likeService.getLikesByStoryId as jest.Mock).mockResolvedValue(
        mockLikesDTO
      );

      await likeController.getLikesByStoryId(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(likeService.getLikesByStoryId).toHaveBeenCalledWith(
        mockReq.params!.id
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.OK,
        'All likes',
        mockLikesDTO
      );
    });

    test('Should get error with unsuccessful get likes', async () => {
      const mockReq: Partial<Request> = {
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };
      const mockError: Partial<Error> = {};

      (likeService.getLikesByStoryId as jest.Mock).mockRejectedValue(mockError);

      await likeController.getLikesByStoryId(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(likeService.getLikesByStoryId).toHaveBeenCalledWith(
        mockReq.params!.id
      );
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('likeController unLikeStory', () => {
    test('Should get HttpStatusCode.CREATED with unlike story', async () => {
      const mockReq: Partial<AuthRequest> = {
        tokenInfo: mockTokenInfo,
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };

      await likeController.unlikeStory(
        mockReq as AuthRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(likeService.unlikeStory).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.tokenInfo
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.OK,
        'Unliked story'
      );
    });

    test('Should get HttpStatusCode.CREATED with unlike story', async () => {
      const mockReq: Partial<AuthRequest> = {
        tokenInfo: mockTokenInfo,
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };

      const mockError: Partial<Error> = {};

      (likeService.unlikeStory as jest.Mock).mockRejectedValue(mockError);

      await likeController.unlikeStory(
        mockReq as AuthRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(likeService.unlikeStory).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.tokenInfo
      );
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
