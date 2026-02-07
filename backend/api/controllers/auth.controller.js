import User from '../models/User.js'
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt.js'

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: '이미 등록된 이메일입니다' })
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: role || 'customer',
    })

    // Generate tokens
    const token = generateToken(user._id, user.role)
    const refreshToken = generateRefreshToken(user._id)

    res.status(201).json({
      message: '회원가입이 완료되었습니다',
      user,
      token,
      refreshToken,
    })
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다' })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다' })
    }

    // Generate tokens
    const token = generateToken(user._id, user.role)
    const refreshToken = generateRefreshToken(user._id)

    res.json({
      message: '로그인 되었습니다',
      user,
      token,
      refreshToken,
    })
  } catch (error) {
    next(error)
  }
}

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다' })
    }

    res.json(user)
  } catch (error) {
    next(error)
  }
}

export const logout = async (req, res, next) => {
  try {
    // In a real app, you might want to blacklist the token
    res.json({ message: '로그아웃 되었습니다' })
  } catch (error) {
    next(error)
  }
}

export const refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' })
    }

    const decoded = verifyRefreshToken(refreshToken)
    const user = await User.findById(decoded.userId)

    if (!user) {
      return res.status(404).json({ message: '사용자를 찾을 수 없습니다' })
    }

    const newToken = generateToken(user._id, user.role)

    res.json({ token: newToken })
  } catch (error) {
    next(error)
  }
}
