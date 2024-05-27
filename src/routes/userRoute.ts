import { Router } from "express";
import * as userController from './../controllers/userController';


const router:Router = Router();

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.insertUser)
    .delete(userController.deleteUser)



export default {router}