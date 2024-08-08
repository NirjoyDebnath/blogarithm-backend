import { Router } from 'express';
import * as storyController from './../controllers/storyController';
import * as authMiddleware from '../middlewares/authMiddleware';
import * as storyMiddleware from './../middlewares/storyMiddleware';
import * as validationMiddleware from '../middlewares/validationMiddleware';

const router: Router = Router();

router
  .route('/')
  .get(storyController.getStories)
  .post(
    validationMiddleware.validateData,
    authMiddleware.authenticateUser,
    storyController.createStory
  );
router
  .route('/:id')
  .get(storyController.getStoryById)
  .patch(
    validationMiddleware.validateData,
    authMiddleware.authenticateUser,
    storyMiddleware.authorizeUpdate,
    storyController.updateStoryById
  )
  .delete(
    authMiddleware.authenticateUser,
    storyMiddleware.authorizeDeletion,
    storyController.deleteStoryById
  );

export default { router };
