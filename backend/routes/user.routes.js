import express from 'express'
import UserController from '../controllers/user.controller.js'
import { isUserAuthenticated } from '../middleware/auth.js'

const router = express.Router()

const user = new UserController()

router.route('/users').get(user.getAllUsers);
router.route('/users/delete').delete(user.deleteUser);
router.route('/me').get(isUserAuthenticated, user.getMe);


export default router