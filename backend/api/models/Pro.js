import mongoose from 'mongoose'

const proSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  specialties: [{
    type: String,
  }],
  experience: {
    type: Number,
    default: 0, // years of experience
  },
  certifications: [{
    name: String,
    issuer: String,
    year: Number,
  }],
  lessonPrice: {
    private: {
      type: Number,
      default: 100000,
    },
    group: {
      type: Number,
      default: 50000,
    },
  },
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
  },
  availableSlots: [{
    day: {
      type: String,
      enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    },
    startTime: String,
    endTime: String,
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Pro = mongoose.model('Pro', proSchema)

export default Pro
