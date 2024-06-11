import { Router } from 'express';
import * as userController from './../controllers/userController';
import * as userMiddleware from '../middleware/authMiddleware';

const router: Router = Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUserById)
  .delete(userMiddleware.userProtect, userController.deleteUserById)
  .patch(userMiddleware.userProtect, userController.updateNameById);

export default { router };
