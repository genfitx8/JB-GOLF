import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { connectDB } from './utils/database.js'
import authRoutes from './routes/auth.js'
import bookingRoutes from './routes/bookings.js'
import locationRoutes from './routes/locations.js'
import proRoutes from './routes/pros.js'
import statsRoutes from './routes/stats.js'
import { errorHandler } from './middleware/error.middleware.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

// MongoDB 연결
connectDB()

// 미들웨어
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

// 라우트
app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/locations', locationRoutes)
app.use('/api/pros', proRoutes)
app.use('/api/stats', statsRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 에러 핸들러
app.use(errorHandler)

// Vercel serverless function export
export default app

// 로컬 개발용
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`🚀 서버가 포트 ${PORT}에서 실행 중입니다`)
  })
}
