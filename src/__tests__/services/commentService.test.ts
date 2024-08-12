import { mockTokenInfo } from '../../__mocks__/auth.mock';
import { mockCommentDTO, mockCommentInput } from '../../__mocks__/comment.mock';
import { mockStoryId } from '../../__mocks__/story.mock';
import { HttpStatusCode } from '../../enums/httpStatusCodes';
import { ICommentDTO } from '../../interfaces/comment';
import * as commentRepository from '../../repositories/commentRepository';
import * as commentService from '../../services/commentService';

jest.mock('./../../repositories/commentRepository', () => ({
  __esModule: true,
  commentStory: jest.fn(),
  getCommentsByStoryId: jest.fn()
}));

describe('commentService tester', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('commentService commentStory', () => {
    test('Should call repository for like a story', async () => {
      (commentRepository.commentStory as jest.Mock).mockResolvedValue(
        mockCommentDTO
      );
      const comment:ICommentDTO = await commentService.commentStory(mockStoryId, mockTokenInfo, mockCommentInput);
      mockCommentDTO.CreatedAt=comment.CreatedAt;
      expect(commentRepository.commentStory).toHaveBeenCalled();
      expect(comment).toEqual(mockCommentDTO);
    });
  });

  describe('commentService getCommentsByStoryId', () => {
    test('Should call repository for get all likes of a story', async () => {
      (commentRepository.getCommentsByStoryId as jest.Mock).mockResolvedValue(
        [mockCommentDTO]
      );
      const comments: ICommentDTO[] =await commentService.getCommentsByStoryId(mockStoryId);
      expect(commentRepository.getCommentsByStoryId).toHaveBeenCalled();
      expect(comments).toEqual([mockCommentDTO]);
    });
  });
});