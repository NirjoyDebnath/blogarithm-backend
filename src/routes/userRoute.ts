import { Router } from 'express';
import * as userController from './../controllers/userController';
import * as authMiddleware from '../middlewares/authMiddleware';
import * as userMiddleware from '../middlewares/userMiddleware';
import * as validationMiddleware from '../middlewares/validationMiddleware';

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
    validationMiddleware.validateData,
    authMiddleware.authenticateUser,
    userMiddleware.authorizeUpdate,
    userController.updateUserById
  )
  .patch(
    validationMiddleware.validateData,
    authMiddleware.authenticateUser,
    userMiddleware.authorizeUpdate,
    userController.updatePasswordById
  );

export default { router };
