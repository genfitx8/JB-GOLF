import Booking from '../models/Booking.js'
import Location from '../models/Location.js'

export const createBooking = async (req, res, next) => {
  try {
    const { locationId, proId, date, timeSlot, duration, type, lessonType } = req.body

    // Check location availability
    const location = await Location.findById(locationId)
    if (!location) {
      return res.status(404).json({ message: '연습장을 찾을 수 없습니다' })
    }

    // Check for existing bookings at the same time
    const existingBooking = await Booking.findOne({
      location: locationId,
      date,
      timeSlot,
      status: { $nin: ['cancelled'] },
    })

    if (existingBooking && location.availableBays <= 0) {
      return res.status(400).json({ message: '해당 시간대에 예약이 불가능합니다' })
    }

    // Calculate amount
    const amount = location.pricePerHour * (duration / 60)

    // Assign bay number
    const bookingsAtTime = await Booking.countDocuments({
      location: locationId,
      date,
      timeSlot,
      status: { $nin: ['cancelled'] },
    })
    const bayNumber = bookingsAtTime + 1

    // Create booking
    const booking = await Booking.create({
      user: req.userId,
      location: locationId,
      pro: proId,
      date,
      timeSlot,
      duration,
      type,
      lessonType,
      bayNumber,
      amount,
      status: 'confirmed',
    })

    await booking.populate('location')

    res.status(201).json({
      message: '예약이 완료되었습니다',
      booking,
    })
  } catch (error) {
    next(error)
  }
}

export const getBookings = async (req, res, next) => {
  try {
    const { status, startDate, endDate, locationId, proId } = req.query
    
    const query = {}
    
    if (status) query.status = status
    if (locationId) query.location = locationId
    if (proId) query.pro = proId
    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = new Date(startDate)
      if (endDate) query.date.$lte = new Date(endDate)
    }

    // Role-based filtering
    if (req.user.role === 'customer') {
      query.user = req.userId
    } else if (req.user.role === 'pro') {
      query.pro = req.userId
    } else if (req.user.role === 'store') {
      // Store can see all bookings for their locations
      const locations = await Location.find({ owner: req.userId })
      query.location = { $in: locations.map(l => l._id) }
    }

    const bookings = await Booking.find(query)
      .populate('location')
      .populate('pro')
      .populate('user', 'name email phone')
      .sort({ date: -1, timeSlot: 1 })

    res.json(bookings)
  } catch (error) {
    next(error)
  }
}

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('location')
      .populate('pro')
      .populate('user', 'name email phone')

    if (!booking) {
      return res.status(404).json({ message: '예약을 찾을 수 없습니다' })
    }

    // Check authorization
    if (
      req.user.role === 'customer' &&
      booking.user.toString() !== req.userId.toString()
    ) {
      return res.status(403).json({ message: '권한이 없습니다' })
    }

    res.json(booking)
  } catch (error) {
    next(error)
  }
}

export const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: '예약을 찾을 수 없습니다' })
    }

    // Check authorization
    if (
      req.user.role === 'customer' &&
      booking.user.toString() !== req.userId.toString()
    ) {
      return res.status(403).json({ message: '권한이 없습니다' })
    }

    const allowedUpdates = ['date', 'timeSlot', 'notes', 'status']
    const updates = {}
    
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key]
      }
    })

    Object.assign(booking, updates)
    await booking.save()

    res.json({
      message: '예약이 수정되었습니다',
      booking,
    })
  } catch (error) {
    next(error)
  }
}

export const cancelBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)

    if (!booking) {
      return res.status(404).json({ message: '예약을 찾을 수 없습니다' })
    }

    // Check authorization
    if (
      req.user.role === 'customer' &&
      booking.user.toString() !== req.userId.toString()
    ) {
      return res.status(403).json({ message: '권한이 없습니다' })
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: '이미 취소된 예약입니다' })
    }

    booking.status = 'cancelled'
    booking.cancelledAt = new Date()
    booking.cancelReason = req.body.reason || '사용자 요청'
    await booking.save()

    res.json({
      message: '예약이 취소되었습니다',
      booking,
    })
  } catch (error) {
    next(error)
  }
}

export const checkAvailability = async (req, res, next) => {
  try {
    const { locationId, date, timeSlot } = req.query

    const location = await Location.findById(locationId)
    if (!location) {
      return res.status(404).json({ message: '연습장을 찾을 수 없습니다' })
    }

    const bookingsCount = await Booking.countDocuments({
      location: locationId,
      date,
      timeSlot,
      status: { $nin: ['cancelled'] },
    })

    const available = bookingsCount < location.totalBays

    res.json({
      available,
      totalBays: location.totalBays,
      bookedBays: bookingsCount,
      availableBays: location.totalBays - bookingsCount,
    })
  } catch (error) {
    next(error)
  }
}
