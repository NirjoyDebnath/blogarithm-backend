import * as storyRepository from '../../repositories/storyRepository';
import * as likeRepository from '../../repositories/likeRepository';
import * as commentRepository from '../../repositories/commentRepository';
import * as storyService from '../../services/storyService';
import { HttpStatusCode } from '../../enums/httpStatusCodes';
import {
  mockCreateStoryInput,
  mockStory,
  mockStoryDTO,
  mockStoryQueryNoParams,
  mockStoryQueryParams,
  mockStoryQueryParamsAuthor,
  mockStoryQueryParamspage,
  mockStoryQueryParamsSearch,
  mockStoryQueryParamsSearchAuthor,
  mockStoryWithIdDTO,
  mockUpdateStoryInput
} from '../../__mocks__/story.mock';
import { mockTokenInfo } from '../../__mocks__/auth.mock';
import { IStoriesDTO, IStoryDTO } from '../../interfaces/story';
import { AppError } from '../../utils/appError';
import { mockId } from '../../__mocks__/user.mock';
import { mockComments } from '../../__mocks__/comment.mock';
import { mockLikes } from '../../__mocks__/like.mock';

jest.mock('./../../repositories/storyRepository', () => ({
  __esModule: true,
  createStory: jest.fn(),
  getAllStories: jest.fn(),
  getStoryCount: jest.fn(),
  getStoryCountByUserId: jest.fn(),
  getSearchCount: jest.fn(),
  getSearchCountByUserId: jest.fn(),
  getStoryById: jest.fn(),
  getStoriesByUserId: jest.fn(),
  updateStoryById: jest.fn(),
  deleteStoryById: jest.fn()
}));
jest.mock('./../../repositories/likeRepository', () => ({
  __esModule: true,
  likeStory: jest.fn(),
  getLikesByStoryId: jest.fn(),
  unlikeStory: jest.fn()
}));
jest.mock('./../../repositories/commentRepository', () => ({
  __esModule: true,
  commentStory: jest.fn(),
  getCommentsByStoryId: jest.fn()
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
    test('Should get all the stories of page 1 even if the page number is not given', async () => {
      (storyRepository.getAllStories as jest.Mock).mockResolvedValue([
        mockStory
      ]);
      for (let i = 0; i < [mockStory].length; i++) {
        (likeRepository.getLikesByStoryId as jest.Mock).mockResolvedValue(
          mockLikes
        );
        (commentRepository.getCommentsByStoryId as jest.Mock).mockResolvedValue(
          mockComments
        );
      }

      (storyRepository.getStoryCount as jest.Mock).mockResolvedValue(1);

      const stories: IStoriesDTO = await storyService.getStories({});

      expect(storyRepository.getAllStories).toHaveBeenCalled();
      expect(stories).toEqual(mockStoryDTO);
    });

    test('Should get all the stories of a specific page', async () => {
      (storyRepository.getAllStories as jest.Mock).mockResolvedValue([
        mockStory
      ]);
      for (let i = 0; i < [mockStory].length; i++) {
        (likeRepository.getLikesByStoryId as jest.Mock).mockResolvedValue(
          mockLikes
        );
        (commentRepository.getCommentsByStoryId as jest.Mock).mockResolvedValue(
          mockComments
        );
      }

      (storyRepository.getStoryCount as jest.Mock).mockResolvedValue(1);

      const stories: IStoriesDTO = await storyService.getStories(
        mockStoryQueryParamspage
      );

      expect(storyRepository.getAllStories).toHaveBeenCalled();
      expect(stories).toEqual(mockStoryDTO);
    });

    test('Should get all the stories with search', async () => {
      (storyRepository.getAllStories as jest.Mock).mockResolvedValue([
        mockStory
      ]);
      for (let i = 0; i < [mockStory].length; i++) {
        (likeRepository.getLikesByStoryId as jest.Mock).mockResolvedValue(
          mockLikes
        );
        (commentRepository.getCommentsByStoryId as jest.Mock).mockResolvedValue(
          mockComments
        );
      }

      (storyRepository.getSearchCount as jest.Mock).mockResolvedValue(1);

      const stories: IStoriesDTO = await storyService.getStories(
        mockStoryQueryParamsSearch
      );

      expect(storyRepository.getAllStories).toHaveBeenCalled();
      expect(stories).toEqual(mockStoryDTO);
    });

    test('Should get all the stories of a specific author', async () => {
      (storyRepository.getStoriesByUserId as jest.Mock).mockResolvedValue([
        mockStory
      ]);
      for (let i = 0; i < [mockStory].length; i++) {
        (likeRepository.getLikesByStoryId as jest.Mock).mockResolvedValue(
          mockLikes
        );
        (commentRepository.getCommentsByStoryId as jest.Mock).mockResolvedValue(
          mockComments
        );
      }

      (storyRepository.getStoryCountByUserId as jest.Mock).mockResolvedValue(1);

      const stories: IStoriesDTO = await storyService.getStories(
        mockStoryQueryParamsAuthor
      );

      expect(storyRepository.getStoriesByUserId).toHaveBeenCalled();
      expect(stories).toEqual(mockStoryDTO);
    });

    test('Should get all the stories with search and a specific author', async () => {
      (storyRepository.getStoriesByUserId as jest.Mock).mockResolvedValue([
        mockStory
      ]);
      for (let i = 0; i < [mockStory].length; i++) {
        (likeRepository.getLikesByStoryId as jest.Mock).mockResolvedValue(
          mockLikes
        );
        (commentRepository.getCommentsByStoryId as jest.Mock).mockResolvedValue(
          mockComments
        );
      }

      (storyRepository.getSearchCountByUserId as jest.Mock).mockResolvedValue(1);

      const stories: IStoriesDTO = await storyService.getStories(
        mockStoryQueryParamsSearchAuthor
      );

      expect(storyRepository.getStoriesByUserId).toHaveBeenCalled();
      expect(stories).toEqual(mockStoryDTO);
    });
  });

  describe('storyService getStoryById test', () => {
    test('Should get a story', async () => {
      (storyRepository.getStoryById as jest.Mock).mockResolvedValue(mockStory);
      (likeRepository.getLikesByStoryId as jest.Mock).mockResolvedValue(
        mockLikes
      );
      (commentRepository.getCommentsByStoryId as jest.Mock).mockResolvedValue(
        mockComments
      );

      const story: IStoryDTO = await storyService.getStoryById(mockId);

      expect(storyRepository.getStoryById).toHaveBeenCalled();
      expect(story).toEqual(mockStoryWithIdDTO);
    });

    test('Should give an error if there is no story', async () => {
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
