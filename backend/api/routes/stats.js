import express from 'express'
import { getStats } from '../controllers/stats.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', authenticate, getStats)

export default router
