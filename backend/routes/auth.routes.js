import express from 'express'
import AuthController from '../controllers/auth.controller.js'

const router = express.Router()

const auth = new AuthController()

router.route('/auth/register').post(auth.signUp)
router.route('/auth/login').post(auth.login)
router.route('/auth/logout').get(auth.logout)


export default router