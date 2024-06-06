import { Router } from 'express';
import * as storyController from './../controllers/storyController';

const router: Router = Router();

router.route('/createStory').post(storyController.createStory);

export default { router };
