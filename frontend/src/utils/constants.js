export const USER_ROLES = {
  CUSTOMER: 'customer',
  PRO: 'pro',
  STORE: 'store',
  ADMIN: 'admin',
}

export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
}

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
}

export const LESSON_TYPES = {
  GROUP: 'group',
  PRIVATE: 'private',
  SEMI_PRIVATE: 'semi-private',
}

export const BAY_STATUS = {
  AVAILABLE: 'available',
  OCCUPIED: 'occupied',
  MAINTENANCE: 'maintenance',
  RESERVED: 'reserved',
}

export const TIME_SLOTS = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30',
]

export const DAYS_OF_WEEK = ['일', '월', '화', '수', '목', '금', '토']

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
  },
  BOOKINGS: {
    BASE: '/bookings',
    AVAILABILITY: '/bookings/availability',
    MY_BOOKINGS: '/bookings/my-bookings',
  },
  LOCATIONS: {
    BASE: '/locations',
  },
  PROS: {
    BASE: '/pros',
  },
}

export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다',
  SERVER_ERROR: '서버 오류가 발생했습니다',
  UNAUTHORIZED: '인증이 필요합니다',
  FORBIDDEN: '접근 권한이 없습니다',
  NOT_FOUND: '요청한 리소스를 찾을 수 없습니다',
  VALIDATION_ERROR: '입력 정보를 확인해주세요',
}

export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: '로그인 되었습니다',
  LOGOUT_SUCCESS: '로그아웃 되었습니다',
  REGISTER_SUCCESS: '회원가입이 완료되었습니다',
  BOOKING_CREATED: '예약이 완료되었습니다',
  BOOKING_UPDATED: '예약이 수정되었습니다',
  BOOKING_CANCELLED: '예약이 취소되었습니다',
  PROFILE_UPDATED: '프로필이 업데이트되었습니다',
}
