import API from './api'

export const createRequest = (data) => API.post('/requests', data)
export const getMyRequests = () => API.get('/requests/my')
export const getReceivedRequests = () => API.get('/requests/received')
export const respondToRequest = (id, data) => API.put(`/requests/${id}/respond`, data)