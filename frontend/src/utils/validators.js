export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password) => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
  return regex.test(password)
}

export const validatePhone = (phone) => {
  const regex = /^01[0-9]-?[0-9]{4}-?[0-9]{4}$/
  return regex.test(phone.replace(/-/g, ''))
}

export const validateRequired = (value) => {
  return value !== null && value !== undefined && value.toString().trim() !== ''
}

export const validateLength = (value, min, max) => {
  const length = value?.toString().length || 0
  return length >= min && length <= max
}

export const validateNumber = (value, min, max) => {
  const num = Number(value)
  if (isNaN(num)) return false
  if (min !== undefined && num < min) return false
  if (max !== undefined && num > max) return false
  return true
}

export const getValidationErrors = (data, rules) => {
  const errors = {}
  
  for (const [field, fieldRules] of Object.entries(rules)) {
    const value = data[field]
    
    if (fieldRules.required && !validateRequired(value)) {
      errors[field] = `${field}는 필수 입력 항목입니다`
      continue
    }
    
    if (fieldRules.email && !validateEmail(value)) {
      errors[field] = '올바른 이메일 형식이 아닙니다'
      continue
    }
    
    if (fieldRules.password && !validatePassword(value)) {
      errors[field] = '비밀번호는 8자 이상, 대소문자와 숫자를 포함해야 합니다'
      continue
    }
    
    if (fieldRules.phone && !validatePhone(value)) {
      errors[field] = '올바른 휴대폰 번호 형식이 아닙니다'
      continue
    }
    
    if (fieldRules.minLength && !validateLength(value, fieldRules.minLength, Infinity)) {
      errors[field] = `최소 ${fieldRules.minLength}자 이상이어야 합니다`
      continue
    }
    
    if (fieldRules.maxLength && !validateLength(value, 0, fieldRules.maxLength)) {
      errors[field] = `최대 ${fieldRules.maxLength}자까지 입력 가능합니다`
      continue
    }
  }
  
  return errors
}
