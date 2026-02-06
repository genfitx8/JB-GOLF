import api from './api'

export const bookingService = {
  async createBooking(bookingData) {
    const response = await api.post('/bookings', bookingData)
    return response.data
  },

  async getBookings(filters = {}) {
    const response = await api.get('/bookings', { params: filters })
    return response.data
  },

  async getBookingById(id) {
    const response = await api.get(`/bookings/${id}`)
    return response.data
  },

  async updateBooking(id, updates) {
    const response = await api.put(`/bookings/${id}`, updates)
    return response.data
  },

  async cancelBooking(id) {
    const response = await api.delete(`/bookings/${id}`)
    return response.data
  },

  async checkAvailability(locationId, date, timeSlot) {
    const response = await api.get('/bookings/availability', {
      params: { locationId, date, timeSlot },
    })
    return response.data
  },

  async getMyBookings() {
    const response = await api.get('/bookings/my-bookings')
    return response.data
  },
}
