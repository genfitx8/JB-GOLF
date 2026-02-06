import mongoose from 'mongoose'

const lessonRecordSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true,
  },
  pro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pro',
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  focusAreas: [{
    type: String,
  }],
  notes: {
    type: String,
  },
  progress: {
    swing: {
      type: Number,
      min: 1,
      max: 10,
    },
    accuracy: {
      type: Number,
      min: 1,
      max: 10,
    },
    power: {
      type: Number,
      min: 1,
      max: 10,
    },
    consistency: {
      type: Number,
      min: 1,
      max: 10,
    },
  },
  homeworkAssigned: {
    type: String,
  },
  videoLinks: [{
    type: String,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const LessonRecord = mongoose.model('LessonRecord', lessonRecordSchema)

export default LessonRecord
