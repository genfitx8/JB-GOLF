import express from 'express'
import {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  checkAvailability,
} from '../controllers/booking.controller.js'
import { authenticate } from '../middleware/auth.middleware.js'
import { bookingValidation, validate } from '../middleware/validation.middleware.js'

const router = express.Router()

// All booking routes require authentication
router.use(authenticate)

router.post('/', bookingValidation, validate, createBooking)
router.get('/', getBookings)
router.get('/availability', checkAvailability)
router.get('/my-bookings', getBookings) // Alias for customer convenience
router.get('/:id', getBookingById)
router.put('/:id', updateBooking)
router.delete('/:id', cancelBooking)

export default router
