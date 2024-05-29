import { Router } from 'express';
import * as userController from './../controllers/userController';

const router:Router = Router();

router.route('/')
    .get(userController.getAllUsers)

router.route('/:id')
    .delete(userController.deleteUser)
    .patch(userController.updateNameById)

export default {router};