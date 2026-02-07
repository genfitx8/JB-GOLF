import express from 'express'
import { register, login, getCurrentUser, logout, refreshToken } from '../controllers/auth.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { registerValidation, loginValidation, validate } from '../middleware/validation.middleware.js'

const router = express.Router()

router.post('/register', registerValidation, validate, register)
router.post('/login', loginValidation, validate, login)
router.post('/logout', authenticate, logout)
router.get('/me', authenticate, getCurrentUser)
router.post('/refresh', refreshToken)

export default router
