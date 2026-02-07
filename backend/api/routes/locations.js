import express from 'express'
import {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
  getBayStatus,
} from '../controllers/location.controller.js'
import { authenticate, authorize } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', getLocations)
router.get('/:id', getLocationById)
router.get('/:id/bay-status', getBayStatus)
router.post('/', authenticate, authorize('store', 'admin'), createLocation)
router.put('/:id', authenticate, authorize('store', 'admin'), updateLocation)
router.delete('/:id', authenticate, authorize('store', 'admin'), deleteLocation)

export default router
