// API utility for making requests to the backend
const API_BASE_URL = 'http://localhost:5002/api'

// Helper function to make API requests with credentials
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const defaultOptions = {
    credentials: 'include', // Include cookies for authentication
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text()
      if (!response.ok) {
        throw new Error(text || `HTTP error! status: ${response.status}`)
      }
      return text
    }

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || data.error || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('API request error:', error)
    throw error
  }
}

// Department APIs
export const departmentAPI = {
  getAll: () => apiRequest('/departments'),
  getById: (id) => apiRequest(`/departments/${id}`),
  create: (data) => apiRequest('/departments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}

// Team APIs
export const teamAPI = {
  getAll: () => apiRequest('/teams'),
  create: (data) => apiRequest('/teams', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  addMember: (data) => apiRequest('/teams/add-member', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}

// Work Center APIs
export const workCenterAPI = {
  getAll: () => apiRequest('/workcenters'),
  getById: (id) => apiRequest(`/workcenters/${id}`),
  create: (data) => apiRequest('/workcenters', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}

// Equipment APIs
export const equipmentAPI = {
  getAll: () => apiRequest('/equipment'),
  getById: (id) => apiRequest(`/equipment/${id}`),
  create: (data) => apiRequest('/equipment', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/equipment/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  scrap: (id) => apiRequest(`/equipment/${id}/scrap`, {
    method: 'PATCH',
  }),
}

// Equipment Category APIs
export const equipmentCategoryAPI = {
  getAll: () => apiRequest('/equipment-categories'),
  getById: (id) => apiRequest(`/equipment-categories/${id}`),
  create: (data) => apiRequest('/equipment-categories', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
}

