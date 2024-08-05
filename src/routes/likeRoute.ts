import express from 'express';
import * as likeController from '../controllers/likeController';
import * as authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router
  .route('/:id')
  .post(authMiddleware.authenticateUser, likeController.likeStory)
  .get(authMiddleware.authenticateUser, likeController.getLikesByStoryId)
  .delete(authMiddleware.authenticateUser, likeController.unlikeStory);
export default { router };
