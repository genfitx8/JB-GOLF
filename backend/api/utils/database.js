import mongoose from 'mongoose'

let isConnected = false

export const connectDB = async () => {
  if (isConnected) {
    console.log('MongoDB is already connected')
    return
  }

  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/jb-golf'
    
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true
    console.log('✅ MongoDB 연결 성공')
  } catch (error) {
    console.error('❌ MongoDB 연결 실패:', error.message)
    // Don't throw in serverless - let requests fail gracefully
    if (process.env.NODE_ENV !== 'production') {
      throw error
    }
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close()
  console.log('MongoDB connection closed')
  process.exit(0)
})
