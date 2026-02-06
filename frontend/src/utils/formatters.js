export const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export const formatTime = (time) => {
  if (!time) return ''
  return time.slice(0, 5) // HH:MM format
}

export const formatDateTime = (dateTime) => {
  if (!dateTime) return ''
  const d = new Date(dateTime)
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '0원'
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
}

export const formatPhoneNumber = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/)
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`
  }
  return phone
}

export const getTimeSlots = () => {
  const slots = []
  for (let hour = 6; hour < 23; hour++) {
    slots.push(`${hour.toString().padStart(2, '0')}:00`)
    slots.push(`${hour.toString().padStart(2, '0')}:30`)
  }
  return slots
}

export const getDayOfWeek = (date) => {
  const days = ['일', '월', '화', '수', '목', '금', '토']
  return days[new Date(date).getDay()]
}
