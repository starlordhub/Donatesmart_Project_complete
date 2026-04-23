import API from './api'

export const createDonation = (data) => API.post('/donations', data)
export const getMyDonations = () => API.get('/donations/my')
export const getAllDonations = (url = '/donations') => API.get(url)
export const getDonationById = (id) => API.get(`/donations/${id}`)
export const deleteDonation = (id) => API.delete(`/donations/${id}`)
export const updateDonationStatus = (id, data) => API.put(`/donations/${id}/status`, data)