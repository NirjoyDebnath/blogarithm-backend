import { Request, Response, NextFunction } from 'express';
import * as storyController from '../../controllers/storyController';
import * as storyService from '../../services/storyService';
import { sendResponse } from '../../utils/responses';
import { StoryDataRequest } from '../../interfaces/auth';
import { HttpStatusCode } from '../../enums/httpStatusCodes';
import { mockParamsId, mockTokenInfo } from '../../__mocks__/auth.mock';
import { mockStoryDTO, mockUpdateStoryInput } from '../../__mocks__/story.mock';

jest.mock('./../../services/storyService', () => ({
  __esModule: true,
  createStory: jest.fn(),
  getStories: jest.fn(),
  getStoryById: jest.fn(),
  updateStoryById: jest.fn(),
  deleteStoryById: jest.fn()
}));

jest.mock('./../../utils/responses', () => ({
  __esModule: true,
  sendResponse: jest.fn()
}));

describe('storyController tester', () => {
  let mockRes: Partial<Response>;
  let mockNext: Partial<NextFunction>;

  beforeEach(() => {
    jest.resetAllMocks();
    mockRes = {};
    mockNext = jest.fn();
  });

  describe('storyController createStory', () => {
    test('Should send HttpStatusCode.CREATED with successful story create', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: mockUpdateStoryInput,
        tokenInfo: mockTokenInfo
      };

      (storyService.createStory as jest.Mock).mockResolvedValue(mockStoryDTO);

      await storyController.createStory(
        mockReq as StoryDataRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.createStory).toHaveBeenCalledWith(
        mockReq.body,
        mockReq.tokenInfo
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.CREATED,
        'Story create successful',
        mockStoryDTO
      );
    });
    test('Should get an error with unsuccessful story create', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: mockUpdateStoryInput
      };
      const mockError: Partial<Error> = {};

      (storyService.createStory as jest.Mock).mockRejectedValue(mockError);

      await storyController.createStory(
        mockReq as StoryDataRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.createStory).toHaveBeenCalledWith(
        mockReq.body,
        mockReq.tokenInfo
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('storyController getStories', () => {
    test('Should get HttpStatusCode.OK with successful stories fetch', async () => {
      const mockReq: Partial<StoryDataRequest> = {};

      (storyService.getStories as jest.Mock).mockResolvedValue([mockStoryDTO]);

      await storyController.getStories(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.getStories).toHaveBeenCalled();
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.OK,
        'All Stories',
        [mockStoryDTO]
      );
    });
    test('Should get error with unsuccessful stories fetch', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: mockUpdateStoryInput
      };
      const mockError: Partial<Error> = {};

      (storyService.getStories as jest.Mock).mockRejectedValue(mockError);

      await storyController.getStories(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.getStories).toHaveBeenCalled();
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('storyController getStoryById', () => {
    test('Should get HttpStatusCode.OK with successful story fetch', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        params: mockParamsId
      };

      (storyService.getStoryById as jest.Mock).mockResolvedValue(mockStoryDTO);

      await storyController.getStoryById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.getStoryById).toHaveBeenCalledWith(
        mockReq.params!.id
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.OK,
        'Got the story',
        mockStoryDTO
      );
    });
    test('Should get error with unsuccessful story fetch', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: mockUpdateStoryInput,
        params: mockParamsId
      };
      const mockError: Partial<Error> = {};

      (storyService.getStoryById as jest.Mock).mockRejectedValue(mockError);

      await storyController.getStoryById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.getStoryById).toHaveBeenCalledWith(
        mockReq.params!.id
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('storyController updateStoryById', () => {
    test('Should get HttpStatusCode.OK with successful story update', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: mockUpdateStoryInput,
        params: mockParamsId
      };

      await storyController.updateStoryById(
        mockReq as StoryDataRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.updateStoryById).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.body
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.OK,
        'Updated'
      );
    });
    test('Should get error with unsuccessful story update', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: mockUpdateStoryInput,
        params: mockParamsId
      };
      const mockError: Partial<Error> = {};

      (storyService.updateStoryById as jest.Mock).mockRejectedValue(mockError);

      await storyController.updateStoryById(
        mockReq as StoryDataRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.updateStoryById).toHaveBeenCalledWith(
        mockReq.params!.id,
        mockReq.body
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('storyController deleteStoryById', () => {
    test('Should get HttpStatusCode.OK with successful story delete', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        params: mockParamsId
      };

      await storyController.deleteStoryById(
        mockReq as StoryDataRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.deleteStoryById).toHaveBeenCalledWith(
        mockReq.params!.id
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        HttpStatusCode.OK,
        'Deleted'
      );
    });
    test('Should get error with unsuccessful story delete', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        params: mockParamsId
      };
      const mockError: Partial<Error> = {};

      (storyService.deleteStoryById as jest.Mock).mockRejectedValue(mockError);

      await storyController.deleteStoryById(
        mockReq as StoryDataRequest,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.deleteStoryById).toHaveBeenCalledWith(
        mockReq.params!.id
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
