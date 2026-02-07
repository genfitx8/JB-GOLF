export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err)

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message)
    return res.status(400).json({
      message: '입력 데이터 검증 실패',
      errors,
    })
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0]
    return res.status(400).json({
      message: `${field} 값이 이미 존재합니다`,
    })
  }

  // Mongoose cast error
  if (err.name === 'CastError') {
    return res.status(400).json({
      message: '잘못된 ID 형식입니다',
    })
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      message: '유효하지 않은 토큰입니다',
    })
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      message: '토큰이 만료되었습니다',
    })
  }

  // Default error
  const statusCode = err.statusCode || 500
  const message = err.message || '서버 오류가 발생했습니다'

  res.status(statusCode).json({
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}
