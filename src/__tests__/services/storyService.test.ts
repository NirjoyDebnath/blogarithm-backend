import * as storyRepository from '../../repositories/storyRepository';
import * as storyService from '../../services/storyService';
import { HttpStatusCode } from '../../enums/httpStatusCodes';
import {
  mockCreateStoryInput,
  mockStory,
  mockStoryDTO,
  mockStoryQueryNoParams,
  mockStoryQueryParams,
  mockStoryQueryParamspage,
  mockUpdateStoryInput
} from '../../__mocks__/story.mock';
import { mockTokenInfo } from '../../__mocks__/auth.mock';
import { IStoryDTO } from '../../interfaces/story';
import { AppError } from '../../utils/appError';
import { mockId } from '../../__mocks__/user.mock';

jest.mock('./../../repositories/storyRepository', () => ({
  __esModule: true,
  createStory: jest.fn(),
  getAllStories: jest.fn(),
  getStoryById: jest.fn(),
  getStoriesByUserId: jest.fn(),
  updateStoryById: jest.fn(),
  deleteStoryById: jest.fn()
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

describe('storyService tester', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('storyService createStory test', () => {
    test('Should call repository for create a story with data', async () => {
      await storyService.createStory(mockCreateStoryInput, mockTokenInfo);

      expect(storyRepository.createStory).toHaveBeenCalled();
    });
  });

  describe('storyService getStories test', () => {
    test('Should get all the stories', async () => {
      (storyRepository.getAllStories as jest.Mock).mockResolvedValue([
        mockStory
      ]);

      const stories: IStoryDTO[] = await storyService.getStories(
        mockStoryQueryNoParams
      );

      expect(storyRepository.getAllStories).toHaveBeenCalled();
      expect(stories).toEqual([mockStoryDTO]);
    });

    test('Should get all the stories of a user', async () => {
      (storyRepository.getStoriesByUserId as jest.Mock).mockResolvedValue([
        mockStory
      ]);

      const stories: IStoryDTO[] =
        await storyService.getStories(mockStoryQueryParams);

      expect(storyRepository.getStoriesByUserId).toHaveBeenCalled();
      expect(stories).toEqual([mockStoryDTO]);
    });

    test('Should get all the stories of a specific page', async () => {
      (storyRepository.getAllStories as jest.Mock).mockResolvedValue([
        mockStory
      ]);

      const stories: IStoryDTO[] = await storyService.getStories(
        mockStoryQueryParamspage
      );

      expect(storyRepository.getAllStories).toHaveBeenCalled();
      expect(stories).toEqual([mockStoryDTO]);
    });

    test('Should give an error if there is no story', async () => {
      (storyRepository.getAllStories as jest.Mock).mockResolvedValue([]);

      await expect(
        storyService.getStories(mockStoryQueryParamspage)
      ).rejects.toThrow(
        new AppError(HttpStatusCode.NOT_FOUND, 'No stories found')
      );

      expect(storyRepository.getAllStories).toHaveBeenCalled();
    });
  });

  describe('storyService getStoryById test', () => {
    test('Should get a story', async () => {
      (storyRepository.getStoryById as jest.Mock).mockResolvedValue(mockStory);

      const story: IStoryDTO = await storyService.getStoryById(mockId);

      expect(storyRepository.getStoryById).toHaveBeenCalled();
      expect(story).toEqual(mockStoryDTO);
    });

    test('Should give an error if there is no story story', async () => {
      (storyRepository.getStoryById as jest.Mock).mockResolvedValue(undefined);

      await expect(storyService.getStoryById(mockId)).rejects.toThrow(
        new AppError(HttpStatusCode.NOT_FOUND, 'No such story')
      );

      expect(storyRepository.getStoryById).toHaveBeenCalled();
    });
  });

  describe('storyService updateStoryById test', () => {
    test('Should update a story', async () => {
      (storyRepository.updateStoryById as jest.Mock).mockResolvedValue(true);

      await storyService.updateStoryById(mockId, mockUpdateStoryInput);

      expect(storyRepository.updateStoryById).toHaveBeenCalled();
    });

    test('Should give an error if there is any internal error', async () => {
      (storyRepository.updateStoryById as jest.Mock).mockResolvedValue(false);

      await expect(
        storyService.updateStoryById(mockId, mockUpdateStoryInput)
      ).rejects.toThrow(
        new AppError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Something went wrong.'
        )
      );

      expect(storyRepository.updateStoryById).toHaveBeenCalled();
    });

    describe('storyService deleteStoryById test', () => {
      test('Should delete a story', async () => {
        (storyRepository.deleteStoryById as jest.Mock).mockResolvedValue(true);

        await storyService.deleteStoryById(mockId);

        expect(storyRepository.deleteStoryById).toHaveBeenCalled();
      });

      test('Should give an error if there is any internal error', async () => {
        (storyRepository.deleteStoryById as jest.Mock).mockResolvedValue(false);

        await expect(storyService.deleteStoryById(mockId)).rejects.toThrow(
          new AppError(
            HttpStatusCode.INTERNAL_SERVER_ERROR,
            'Something went wrong.'
          )
        );

        expect(storyRepository.deleteStoryById).toHaveBeenCalled();
      });
    });
  });
});
