import api from './api'

export const proService = {
  async getPros(filters = {}) {
    const response = await api.get('/pros', { params: filters })
    return response.data
  },

  async getProById(id) {
    const response = await api.get(`/pros/${id}`)
    return response.data
  },

  async updateProfile(id, updates) {
    const response = await api.put(`/pros/${id}`, updates)
    return response.data
  },

  async getSchedule(proId, date) {
    const response = await api.get(`/pros/${proId}/schedule`, {
      params: { date },
    })
    return response.data
  },

  async updateSchedule(proId, scheduleData) {
    const response = await api.put(`/pros/${proId}/schedule`, scheduleData)
    return response.data
  },

  async getStudents(proId) {
    const response = await api.get(`/pros/${proId}/students`)
    return response.data
  },

  async addLessonRecord(proId, recordData) {
    const response = await api.post(`/pros/${proId}/lesson-records`, recordData)
    return response.data
  },

  async getEarnings(proId, period) {
    const response = await api.get(`/pros/${proId}/earnings`, {
      params: { period },
    })
    return response.data
  },
}
