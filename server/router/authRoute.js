import express from 'express'
import { login,signUp, verifyOtp,googleLogin} from '../controller/authController.js'

const router = express.Router()

router.post('/login',login)
router.post('/signup',signUp)
router.post('/verify-otp',verifyOtp)
router.post('/google_verfiy',googleLogin)
// router.get('/logout',logout)


export default router