import Location from '../models/Location.js'
import Booking from '../models/Booking.js'

export const getLocations = async (req, res, next) => {
  try {
    const { status } = req.query
    const query = {}
    
    if (status) query.status = status

    const locations = await Location.find(query).populate('owner', 'name email')

    res.json(locations)
  } catch (error) {
    next(error)
  }
}

export const getLocationById = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id).populate('owner', 'name email')

    if (!location) {
      return res.status(404).json({ message: '연습장을 찾을 수 없습니다' })
    }

    res.json(location)
  } catch (error) {
    next(error)
  }
}

export const createLocation = async (req, res, next) => {
  try {
    const locationData = {
      ...req.body,
      owner: req.userId,
    }

    const location = await Location.create(locationData)

    res.status(201).json({
      message: '연습장이 등록되었습니다',
      location,
    })
  } catch (error) {
    next(error)
  }
}

export const updateLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id)

    if (!location) {
      return res.status(404).json({ message: '연습장을 찾을 수 없습니다' })
    }

    // Check authorization
    if (location.owner.toString() !== req.userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: '권한이 없습니다' })
    }

    Object.assign(location, req.body)
    await location.save()

    res.json({
      message: '연습장 정보가 수정되었습니다',
      location,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id)

    if (!location) {
      return res.status(404).json({ message: '연습장을 찾을 수 없습니다' })
    }

    // Check authorization
    if (location.owner.toString() !== req.userId.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: '권한이 없습니다' })
    }

    await location.deleteOne()

    res.json({ message: '연습장이 삭제되었습니다' })
  } catch (error) {
    next(error)
  }
}

export const getBayStatus = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id)

    if (!location) {
      return res.status(404).json({ message: '연습장을 찾을 수 없습니다' })
    }

    const now = new Date()
    const currentDate = now.toISOString().split('T')[0]
    const currentHour = now.getHours()
    const currentTimeSlot = `${currentHour.toString().padStart(2, '0')}:00`

    const activeBookings = await Booking.find({
      location: req.params.id,
      date: currentDate,
      timeSlot: { $gte: currentTimeSlot },
      status: 'confirmed',
    }).populate('user', 'name')

    const baysStatus = Array.from({ length: location.totalBays }, (_, i) => ({
      bayNumber: i + 1,
      status: 'available',
      booking: null,
    }))

    activeBookings.forEach(booking => {
      if (booking.bayNumber && booking.bayNumber <= location.totalBays) {
        baysStatus[booking.bayNumber - 1] = {
          bayNumber: booking.bayNumber,
          status: 'occupied',
          booking: {
            id: booking._id,
            user: booking.user?.name,
            timeSlot: booking.timeSlot,
          },
        }
      }
    })

    res.json({
      location: location.name,
      totalBays: location.totalBays,
      bays: baysStatus,
      timestamp: now,
    })
  } catch (error) {
    next(error)
  }
}
