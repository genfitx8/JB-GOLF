import { body, validationResult } from 'express-validator'

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: '입력 데이터 검증 실패',
      errors: errors.array(),
    })
  }
  next()
}

export const registerValidation = [
  body('name').trim().notEmpty().withMessage('이름은 필수입니다'),
  body('email').isEmail().withMessage('올바른 이메일 형식이 아닙니다'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('비밀번호는 최소 6자 이상이어야 합니다'),
  body('phone').notEmpty().withMessage('전화번호는 필수입니다'),
  body('role')
    .isIn(['customer', 'pro', 'store'])
    .withMessage('올바른 역할을 선택해주세요'),
]

export const loginValidation = [
  body('email').isEmail().withMessage('올바른 이메일 형식이 아닙니다'),
  body('password').notEmpty().withMessage('비밀번호는 필수입니다'),
]

export const bookingValidation = [
  body('locationId').notEmpty().withMessage('연습장 선택은 필수입니다'),
  body('date').isISO8601().withMessage('올바른 날짜 형식이 아닙니다'),
  body('timeSlot').notEmpty().withMessage('시간대 선택은 필수입니다'),
  body('type')
    .isIn(['practice', 'lesson'])
    .withMessage('올바른 예약 유형을 선택해주세요'),
]
