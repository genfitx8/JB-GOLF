import Pro from '../models/Pro.js'
import User from '../models/User.js'
import Booking from '../models/Booking.js'

export const getPros = async (req, res, next) => {
  try {
    const { locationId, status } = req.query
    const query = {}
    
    if (locationId) query.location = locationId
    if (status) query.status = status

    const pros = await Pro.find(query).populate('user', 'name email phone profileImage')

    res.json(pros)
  } catch (error) {
    next(error)
  }
}

export const getProById = async (req, res, next) => {
  try {
    const pro = await Pro.findById(req.params.id)
      .populate('user', 'name email phone profileImage')
      .populate('location', 'name address')

    if (!pro) {
      return res.status(404).json({ message: '프로를 찾을 수 없습니다' })
    }

    res.json(pro)
  } catch (error) {
    next(error)
  }
}

export const updateProfile = async (req, res, next) => {
  try {
    const pro = await Pro.findOne({ user: req.userId })

    if (!pro) {
      return res.status(404).json({ message: '프로 프로필을 찾을 수 없습니다' })
    }

    Object.assign(pro, req.body)
    await pro.save()

    res.json({
      message: '프로필이 수정되었습니다',
      pro,
    })
  } catch (error) {
    next(error)
  }
}

export const getSchedule = async (req, res, next) => {
  try {
    const { date } = req.query
    const proId = req.params.id

    const query = {
      pro: proId,
      status: { $nin: ['cancelled'] },
    }

    if (date) {
      query.date = date
    }

    const bookings = await Booking.find(query)
      .populate('user', 'name phone')
      .populate('location', 'name')
      .sort({ date: 1, timeSlot: 1 })

    res.json(bookings)
  } catch (error) {
    next(error)
  }
}

export const getStudents = async (req, res, next) => {
  try {
    const proId = req.params.id

    // Get unique students who have bookings with this pro
    const bookings = await Booking.find({
      pro: proId,
      type: 'lesson',
      status: 'completed',
    }).populate('user', 'name email phone')

    // Extract unique students
    const studentMap = new Map()
    bookings.forEach(booking => {
      if (booking.user && !studentMap.has(booking.user._id.toString())) {
        studentMap.set(booking.user._id.toString(), {
          ...booking.user.toJSON(),
          totalLessons: 1,
          lastLesson: booking.date,
        })
      } else if (booking.user) {
        const student = studentMap.get(booking.user._id.toString())
        student.totalLessons++
        if (new Date(booking.date) > new Date(student.lastLesson)) {
          student.lastLesson = booking.date
        }
      }
    })

    const students = Array.from(studentMap.values())

    res.json(students)
  } catch (error) {
    next(error)
  }
}

export const getEarnings = async (req, res, next) => {
  try {
    const { period } = req.query // 'week', 'month', 'year'
    const proId = req.params.id

    const now = new Date()
    let startDate = new Date()

    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setMonth(now.getMonth() - 1)
    }

    const bookings = await Booking.find({
      pro: proId,
      type: 'lesson',
      status: 'completed',
      date: { $gte: startDate },
    })

    const totalEarnings = bookings.reduce((sum, booking) => sum + booking.amount, 0)
    const totalLessons = bookings.length

    res.json({
      period,
      totalEarnings,
      totalLessons,
      averagePerLesson: totalLessons > 0 ? totalEarnings / totalLessons : 0,
      bookings,
    })
  } catch (error) {
    next(error)
  }
}
