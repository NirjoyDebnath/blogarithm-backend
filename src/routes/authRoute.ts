import express from 'express';
import * as authController from '../controllers/authController';
import * as authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/signUp').post(authController.signUp);
router.route('/logIn').post(authController.logIn);
router
  .route('/updatePassword')
  .patch(authMiddleware.authenticateUser, authController.updatePassword);

export default { router };
