import { Request, Response, NextFunction } from 'express';
import * as commentController from '../../controllers/commentController';
import * as commentService from '../../services/commentService';
import { sendResponse } from '../../utils/responses';
import { HttpStatusCode } from '../../enums/httpStatusCodes';
import { AuthRequest } from '../../interfaces/auth';
import { mockTokenInfo } from '../../__mocks__/auth.mock';
import { mockCommentDTO, mockCommentInput } from '../../__mocks__/comment.mock';

jest.mock('./../../services/commentService', () => ({
  __esModule: true,
  commentStory: jest.fn(),
  getCommentsByStoryId: jest.fn()
}));

jest.mock('./../../utils/responses', () => ({
  __esModule: true,
  sendResponse: jest.fn()
}));

describe('commentController tester', () => {
  let mockRes: Partial<Response>;
  let mockNext: Partial<NextFunction>;

  beforeEach(() => {
    jest.resetAllMocks();
    mockRes = {};
    mockNext = jest.fn();
  });

  describe('commestController commentStory', () => {
    test('Should get HttpStatusCode.CREATED with comment story', async () => {
      const mockReq: Partial<AuthRequest> = {
        body: mockCommentInput,
        tokenInfo: mockTokenInfo,
        params: { id: 'story-37a0-11ef-81cc-088fc31977ac' }
      };

      (commentService.commentStory as jest.Mock).mockResolvedValue(
        mockCommentDTO
      );

      await commentController.commentStory(
        mockReq as AuthRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(commentService.commentStory).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.tokenInfo,
        mockReq.body
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.CREATED,
        'Comment successful',
        mockCommentDTO
      );
    });

    test('Should get error with unsuccessful comment story', async () => {
      const mockReq: Partial<AuthRequest> = {
        body: mockCommentInput,
        tokenInfo: mockTokenInfo,
        params: { id: 'story-37a0-11ef-81cc-088fc31977ac' }
      };

      const mockError: Partial<Error> = {};

      (commentService.commentStory as jest.Mock).mockRejectedValue(mockError);

      await commentController.commentStory(
        mockReq as AuthRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(commentService.commentStory).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.tokenInfo,
        mockReq.body
      );
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('commentController getCommentsByStoryId', () => {
    test('Should get HttpStatusCode.OK with all comments', async () => {
      const mockReq: Partial<Request> = {
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };

      (commentService.getCommentsByStoryId as jest.Mock).mockResolvedValue([
        mockCommentDTO
      ]);

      await commentController.getCommentsByStoryId(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(commentService.getCommentsByStoryId).toHaveBeenCalledWith(
        mockReq.params!.id
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.OK,
        'All comments',
        [mockCommentDTO]
      );
    });

    test('Should get error with unsuccessful get likes', async () => {
      const mockReq: Partial<Request> = {
        params: { id: '4818b0ec-37a0-11ef-81cc-088fc31977ac' }
      };
      const mockError: Partial<Error> = {};

      (commentService.getCommentsByStoryId as jest.Mock).mockRejectedValue(
        mockError
      );

      await commentController.getCommentsByStoryId(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(commentService.getCommentsByStoryId).toHaveBeenCalledWith(
        mockReq.params!.id
      );
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
