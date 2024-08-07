import { Router } from 'express';
import * as userController from './../controllers/userController';
import * as authMiddleware from '../middlewares/authMiddleware';
import * as userMiddleware from '../middlewares/userMiddleware';

const router: Router = Router();

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUserById)
  .delete(
    authMiddleware.authenticateUser,
    userMiddleware.authorizeDeletion,
    userController.deleteUserById
  )
  .put(
    authMiddleware.authenticateUser,
    userMiddleware.authorizeUpdate,
    userController.updateUserById
  )
  .patch(authMiddleware.authenticateUser, userController.updatePasswordById);

export default { router };
