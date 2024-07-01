import express from 'express';
import * as authController from '../controllers/authController';

const router = express.Router();

router.route('/signUp').post(authController.signUp);
router.route('/logIn').post(authController.logIn);

export default { router };
