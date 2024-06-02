import { Router } from 'express';
import * as userController from './../controllers/userController';

const router: Router = Router();

router.route('/')
  .get(userController.getAllUsers)
  .delete(userController.deleteUser)
  .patch(userController.updateName);

router
  .route('/:id')
  .delete(userController.deleteUserById)
  .patch(userController.updateNameById);

export default { router };
