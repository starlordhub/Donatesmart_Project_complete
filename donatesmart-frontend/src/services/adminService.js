import API from './api'

export const getAdminStats = () => API.get('/admin/stats')
export const getAllUsers = (params) => {
    if (params) return API.get(`/admin/users?${params}`)
    return API.get('/admin/users')
}
export const verifyNGO = (id) => API.put(`/admin/users/${id}/verify`)
export const toggleUser = (id) => API.put(`/admin/users/${id}/toggle`)
export const getAllDonationsAdmin = () => API.get('/admin/donations')