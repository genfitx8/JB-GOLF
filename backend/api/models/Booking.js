import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  pro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pro',
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 60, // minutes
  },
  bayNumber: {
    type: Number,
  },
  type: {
    type: String,
    enum: ['practice', 'lesson'],
    default: 'practice',
  },
  lessonType: {
    type: String,
    enum: ['private', 'group', 'semi-private'],
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending',
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  amount: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
  cancelledAt: {
    type: Date,
  },
  cancelReason: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

bookingSchema.index({ user: 1, date: 1 })
bookingSchema.index({ location: 1, date: 1, timeSlot: 1 })
bookingSchema.index({ pro: 1, date: 1 })

bookingSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
