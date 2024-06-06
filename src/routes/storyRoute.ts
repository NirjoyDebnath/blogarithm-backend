import { Router } from 'express';
import * as storyController from './../controllers/storyController';

const router: Router = Router();

router.route('/createStory').post(storyController.createStory);
router.route('/').get(storyController.getAllStories);
router
  .route('/:id')
  .get(storyController.getStoryById)
  .patch(storyController.updateStoryById)
  .delete(storyController.deleteStoryById);

export default { router };
