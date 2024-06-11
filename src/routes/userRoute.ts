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
    userMiddleware.authorizedForDelete,
    userController.deleteUserById
  )
  .patch(
    authMiddleware.authenticateUser,
    userMiddleware.authorizedForUpdate,
    userController.updateUserById
  );

export default { router };
