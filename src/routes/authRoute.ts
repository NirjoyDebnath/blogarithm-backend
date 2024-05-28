import express from 'express'
import { signUp } from '../controllers/authController'

const router = express.Router()

router.route('/signUp')
    .post(signUp)

export default {router}