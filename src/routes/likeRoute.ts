import express from 'express';
import * as authController from '../controllers/authController';
import * as validationMiddleware from '../middlewares/validationMiddleware';

const router = express.Router();

router
  .route('/signUp')
  .post(validationMiddleware.validateData, authController.signUp);
router
  .route('/logIn')
  .post(validationMiddleware.validateData, authController.logIn);

export default { router };
