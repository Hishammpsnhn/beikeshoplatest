import express from 'express'
import { login,signUp, verifyOtp,googleLogin, forgotPassword, forgotPassword_verifyOTP, change_password,logout} from '../controller/authController.js'

const router = express.Router()

router.get('/logout',logout)
router.post('/login',login)
router.post('/signup',signUp)
router.post('/verify-otp',verifyOtp)
router.post('/google_verfiy',googleLogin)
router.post('/forgot_password',forgotPassword)
router.post('/forgot_password_verifyOtp',forgotPassword_verifyOTP)
router.post('/:id/change_password',change_password)


export default router