import { mockTokenInfo } from '../../__mocks__/auth.mock';
import { mockLikeDTO, mockLikesDTO, mockUnlikesDTO } from '../../__mocks__/like.mock';
import { mockStoryId } from '../../__mocks__/story.mock';
import { HttpStatusCode } from '../../enums/httpStatusCodes';
import { ILikeDTO } from '../../interfaces/like';
import * as likeRepository from '../../repositories/likeRepository';
import * as likeService from '../../services/likeService';
import { AppError } from '../../utils/appError';

jest.mock('./../../repositories/likeRepository', () => ({
  __esModule: true,
  likeStory: jest.fn(),
  getLikesByStoryId: jest.fn(),
  unlikeStory: jest.fn()
}));

describe('likeService tester', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('likeService likeStory', () => {
    test('Should call repository for like a story', async () => {
      await likeService.likeStory(mockStoryId, mockTokenInfo);
      expect(likeRepository.likeStory).toHaveBeenCalled();
    });
  });

  describe('likeService getLikesByStoryId', () => {
    test('Should call repository for get all likes of a story', async () => {
      (likeRepository.getLikesByStoryId as jest.Mock).mockResolvedValue(
        [mockLikeDTO]
      );
      const likes: ILikeDTO[] =await likeService.getLikesByStoryId(mockStoryId);
      expect(likeRepository.getLikesByStoryId).toHaveBeenCalled();
      expect(likes).toEqual([mockLikeDTO]);
    });
  });

  describe('unlikeService unlikeStory', () => {
    test('Should call repository for unlike a story', async () => {
      await likeService.unlikeStory(mockStoryId, mockTokenInfo);
      expect(likeRepository.unlikeStory).toHaveBeenCalled();
    });

    test('Should give an error', async () => {
      (likeRepository.unlikeStory as jest.Mock).mockResolvedValue(
        0
      );
      
      await expect(
        likeService.unlikeStory(mockStoryId, mockTokenInfo)
      ).rejects.toThrow(
        new AppError(
          HttpStatusCode.INTERNAL_SERVER_ERROR,
          'Something went wrong.'
        )
      );
      expect(likeRepository.unlikeStory).toHaveBeenCalled();
    });
  });
});
