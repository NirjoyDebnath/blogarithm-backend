import express from 'express';
import * as commentController from '../controllers/commentController';
import * as authMiddleware from '../middlewares/authMiddleware';
import * as validationMiddleware from '../middlewares/validationMiddleware';

const router = express.Router();

router
  .route('/:id')
  .post(
    validationMiddleware.validateData,
    authMiddleware.authenticateUser,
    commentController.commentStory
  )
  .get(authMiddleware.authenticateUser, commentController.getCommentsByStoryId);

export default { router };
