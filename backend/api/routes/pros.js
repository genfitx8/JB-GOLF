import express from 'express'
import {
  getPros,
  getProById,
  updateProfile,
  getSchedule,
  getStudents,
  getEarnings,
} from '../controllers/pro.controller.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', getPros)
router.get('/:id', getProById)
router.get('/:id/schedule', getSchedule)
router.get('/:id/students', authenticate, authorize('pro', 'admin'), getStudents)
router.get('/:id/earnings', authenticate, authorize('pro', 'admin'), getEarnings)
router.put('/:id', authenticate, authorize('pro', 'admin'), updateProfile)

export default router
