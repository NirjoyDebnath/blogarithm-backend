import { Router } from 'express';
import * as userController from './../controllers/userController';

const router: Router = Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUserById)
  .delete(userController.deleteUserById)
  .patch(userController.updateUserById);

export default { router };
