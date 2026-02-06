import { verifyToken } from '../utils/jwt.js'
import User from '../models/User.js'

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')
    
    if (!token) {
      return res.status(401).json({ message: '인증 토큰이 필요합니다' })
    }

    const decoded = verifyToken(token)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(401).json({ message: '사용자를 찾을 수 없습니다' })
    }

    req.user = user
    req.userId = user._id
    next()
  } catch (error) {
    return res.status(401).json({ message: '유효하지 않은 토큰입니다' })
  }
}

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: '인증이 필요합니다' })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: '권한이 없습니다' })
    }

    next()
  }
}
