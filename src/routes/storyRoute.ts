import { Router } from 'express';
import * as storyController from './../controllers/storyController';
import * as authMiddleware from '../middlewares/authMiddleware';
import * as storyMiddleware from './../middlewares/storyMiddleware';

const router: Router = Router();

router
  .route('/')
  .get(storyController.getStories)
  .post(authMiddleware.authenticateUser, storyController.createStory);
router
  .route('/:id')
  .get(storyController.getStoryById)
  .patch(
    authMiddleware.authenticateUser,
    storyMiddleware.authorizedForUpdate,
    storyController.updateStoryById
  )
  .delete(
    authMiddleware.authenticateUser,
    storyMiddleware.authorizedForDelete,
    storyController.deleteStoryById
  );

export default { router };
