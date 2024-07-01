import { Request, Response, NextFunction } from 'express';
import * as storyController from '../../controllers/storyController';
import * as storyService from '../../services/storyService';
import { sendResponse } from '../../utils/responses';
import { StoryDataRequest } from '../../interfaces/auth';
import { IStoryDTO } from '../../interfaces/story';

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
    test('Story should be created with valid input', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: {
          Title: 'Mock title',
          Description: 'Mock description'
        },
        tokenInfo: {
          userName: 'Nirjoy',
          name: 'Nirjoy Debnath',
          role: 0,
          iat: 10000000000,
          exp: 10000010000
        }
      };

      await storyController.createStory(
        mockReq as Request,
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
        200,
        'Story create successful'
      );
    });
    test('Story should not be created with invalid input', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: {
          Title: 'Mock title',
          Description: 'Mock description'
        }
      };
      const mockError: Partial<Error> = {};

      (storyService.createStory as jest.Mock).mockRejectedValue(mockError);

      await storyController.createStory(
        mockReq as Request,
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
    test('Should get 200 and get the stories', async () => {
      const mockReq: Partial<StoryDataRequest> = {};
      const mockStories: IStoryDTO[] = [
        {
          Title: 'Mock title',
          Description: 'Mock description',
          AuthorName: 'Nirjoy Debnath',
          AuthorUserName: 'Nirjoy'
        }
      ];

      (storyService.getStories as jest.Mock).mockResolvedValue(mockStories);

      await storyController.getStories(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.getStories).toHaveBeenCalled();
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        200,
        'All Stories',
        mockStories
      );
    });
    test('Should get an error', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: {
          Title: 'Mock title',
          Description: 'Mock description'
        }
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
    test('Should get 200 and get a story', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        params: { id: '1' }
      };
      const mockStories: IStoryDTO[] = [
        {
          Title: 'Mock title',
          Description: 'Mock description',
          AuthorName: 'Nirjoy Debnath',
          AuthorUserName: 'Nirjoy'
        }
      ];

      (storyService.getStoryById as jest.Mock).mockResolvedValue(mockStories);

      await storyController.getStoryById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.getStoryById).toHaveBeenCalledWith(
        Number(mockReq.params!.id)
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        200,
        'Got the story',
        mockStories
      );
    });
    test('Should get an error', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: {
          Title: 'Mock title',
          Description: 'Mock description'
        },
        params: { id: '1' }
      };
      const mockError: Partial<Error> = {};

      (storyService.getStoryById as jest.Mock).mockRejectedValue(mockError);

      await storyController.getStoryById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.getStoryById).toHaveBeenCalledWith(
        Number(mockReq.params!.id)
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('storyController updateStoryById', () => {
    test('Should get 200 and update a story', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: {
          Title: 'Mock title',
          Description: 'Mock description'
        },
        params: { id: '1' }
      };

      await storyController.updateStoryById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.updateStoryById).toHaveBeenCalledWith(
        Number(mockReq.params!.id),
        mockReq.body
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        200,
        'Updated'
      );
    });
    test('Should not update a story', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        body: {
          Title: 'Mock title',
          Description: 'Mock description'
        },
        params: { id: '1' }
      };
      const mockError: Partial<Error> = {};

      (storyService.updateStoryById as jest.Mock).mockRejectedValue(mockError);

      await storyController.updateStoryById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.updateStoryById).toHaveBeenCalledWith(
        Number(mockReq.params!.id),
        mockReq.body
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('storyController deleteStoryById', () => {
    test('Should get 200 and delete a story', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        params: { id: '1' }
      };

      await storyController.deleteStoryById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.deleteStoryById).toHaveBeenCalledWith(
        Number(mockReq.params!.id)
      );
      expect(sendResponse).toHaveBeenCalledWith(
        mockReq,
        mockRes,
        200,
        'Deleted'
      );
    });
    test('Should not delete a story', async () => {
      const mockReq: Partial<StoryDataRequest> = {
        params: { id: '1' }
      };
      const mockError: Partial<Error> = {};

      (storyService.deleteStoryById as jest.Mock).mockRejectedValue(mockError);

      await storyController.deleteStoryById(
        mockReq as Request,
        mockRes as Response,
        mockNext as NextFunction
      );

      expect(storyService.deleteStoryById).toHaveBeenCalledWith(
        Number(mockReq.params!.id)
      );
      expect(sendResponse).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});
