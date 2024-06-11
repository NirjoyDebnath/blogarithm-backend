import { Router } from 'express';
import * as storyController from './../controllers/storyController';

const router: Router = Router();

router
  .route('/')
  .get(storyController.getStories)
  .post(storyController.createStory);
router
  .route('/:id')
  .get(storyController.getStoryById)
  .patch(storyController.updateStoryById)
  .delete(storyController.deleteStoryById);

export default { router };
