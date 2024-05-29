import express from 'express';
import { signUp } from '../controllers/authController';
import { logIn } from '../controllers/authController';

const router = express.Router();

router.route('/signUp')
    .post(signUp);

router.route('/logIn')
    .post(logIn)

export default {router};