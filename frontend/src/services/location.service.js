import api from './api'

export const locationService = {
  async getLocations(filters = {}) {
    const response = await api.get('/locations', { params: filters })
    return response.data
  },

  async getLocationById(id) {
    const response = await api.get(`/locations/${id}`)
    return response.data
  },

  async createLocation(locationData) {
    const response = await api.post('/locations', locationData)
    return response.data
  },

  async updateLocation(id, updates) {
    const response = await api.put(`/locations/${id}`, updates)
    return response.data
  },

  async deleteLocation(id) {
    const response = await api.delete(`/locations/${id}`)
    return response.data
  },

  async getBayStatus(locationId) {
    const response = await api.get(`/locations/${locationId}/bay-status`)
    return response.data
  },
}
