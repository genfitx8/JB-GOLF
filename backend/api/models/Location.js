import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  totalBays: {
    type: Number,
    required: true,
    default: 10,
  },
  availableBays: {
    type: Number,
    default: function() {
      return this.totalBays
    },
  },
  openingHours: {
    start: {
      type: String,
      default: '06:00',
    },
    end: {
      type: String,
      default: '23:00',
    },
  },
  pricePerHour: {
    type: Number,
    required: true,
    default: 30000,
  },
  facilities: [{
    type: String,
  }],
  images: [{
    type: String,
  }],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Location = mongoose.model('Location', locationSchema)

export default Location
