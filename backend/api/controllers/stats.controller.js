import Booking from '../models/Booking.js'
import Location from '../models/Location.js'
import User from '../models/User.js'

export const getStats = async (req, res, next) => {
  try {
    const { startDate, endDate, locationId } = req.query

    const query = {}
    
    if (startDate || endDate) {
      query.date = {}
      if (startDate) query.date.$gte = new Date(startDate)
      if (endDate) query.date.$lte = new Date(endDate)
    }

    if (locationId) {
      query.location = locationId
    }

    // Role-based filtering
    if (req.user.role === 'store') {
      const locations = await Location.find({ owner: req.userId })
      query.location = { $in: locations.map(l => l._id) }
    } else if (req.user.role === 'pro') {
      query.pro = req.userId
    }

    const [
      totalBookings,
      completedBookings,
      cancelledBookings,
      totalRevenue,
      bookingsByStatus,
    ] = await Promise.all([
      Booking.countDocuments(query),
      Booking.countDocuments({ ...query, status: 'completed' }),
      Booking.countDocuments({ ...query, status: 'cancelled' }),
      Booking.aggregate([
        { $match: { ...query, status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$amount' } } },
      ]),
      Booking.aggregate([
        { $match: query },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ])

    res.json({
      totalBookings,
      completedBookings,
      cancelledBookings,
      pendingBookings: totalBookings - completedBookings - cancelledBookings,
      totalRevenue: totalRevenue[0]?.total || 0,
      bookingsByStatus,
    })
  } catch (error) {
    next(error)
  }
}
