/**
 * API Service Configuration
 * Centralized HTTP client for all API requests
 */

// Import Supabase service
import { supabaseAuth, supabaseDB } from './supabase'
// Import mock API for fallback
import { mockApiService } from './mockApi'

// Base API URL - should be from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true' // Use Supabase by default
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

/**
 * Custom API Error class
 */
export class APIError extends Error {
  constructor(message, status, data = null) {
    super(message)
    this.name = 'APIError'
    this.status = status
    this.data = data
  }
}

/**
 * HTTP client with interceptors
 */
class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }

  /**
   * Get auth token from localStorage
   */
  getAuthToken() {
    return localStorage.getItem('auth_token')
  }

  /**
   * Build headers with authentication
   */
  buildHeaders(customHeaders = {}) {
    const headers = { ...this.defaultHeaders, ...customHeaders }
    const token = this.getAuthToken()
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    return headers
  }

  /**
   * Handle API response
   */
  async handleResponse(response) {
    const contentType = response.headers.get('content-type')
    const isJSON = contentType && contentType.includes('application/json')
    
    let data = null
    if (isJSON) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    if (!response.ok) {
      const message = data?.message || data?.error || `HTTP Error ${response.status}`
      throw new APIError(message, response.status, data)
    }

    return data
  }

  /**
   * Generic request method
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      ...options,
      headers: this.buildHeaders(options.headers)
    }

    try {
      const response = await fetch(url, config)
      return await this.handleResponse(response)
    } catch (error) {
      if (error instanceof APIError) {
        throw error
      }
      
      // Network error or other fetch errors
      throw new APIError(
        error.message || 'Network error occurred',
        0,
        null
      )
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = null) {
    let url = endpoint
    
    if (params) {
      const queryString = new URLSearchParams(params).toString()
      url = `${endpoint}?${queryString}`
    }
    
    return this.request(url, { method: 'GET' })
  }

  /**
   * POST request
   */
  async post(endpoint, data = null) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null
    })
  }

  /**
   * PUT request
   */
  async put(endpoint, data = null) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : null
    })
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data = null) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : null
    })
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  /**
   * Upload file with FormData
   */
  async upload(endpoint, formData) {
    const headers = this.buildHeaders()
    delete headers['Content-Type'] // Let browser set it with boundary

    return this.request(endpoint, {
      method: 'POST',
      body: formData,
      headers
    })
  }
}

// Create singleton instance
export const apiClient = new APIClient(API_BASE_URL)

/**
 * API Endpoints
 */
export const api = {
  // Authentication
  auth: {
    login: (credentials) => apiClient.post('/auth/login', credentials),
    signup: (userData) => apiClient.post('/auth/signup', userData),
    logout: () => apiClient.post('/auth/logout'),
    refreshToken: () => apiClient.post('/auth/refresh'),
    forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
    resetPassword: (token, password) => apiClient.post('/auth/reset-password', { token, password }),
    verifyEmail: (token) => apiClient.post('/auth/verify-email', { token })
  },

  // Accommodations
  accommodations: {
    getAll: (params) => apiClient.get('/accommodations', params),
    getById: (id) => apiClient.get(`/accommodations/${id}`),
    search: (query) => apiClient.get('/accommodations/search', query),
    getNearby: (lat, lng, radius) => apiClient.get('/accommodations/nearby', { lat, lng, radius }),
    getReviews: (id) => apiClient.get(`/accommodations/${id}/reviews`)
  },

  // Bookings
  bookings: {
    create: (bookingData) => apiClient.post('/bookings', bookingData),
    getById: (id) => apiClient.get(`/bookings/${id}`),
    getMyBookings: () => apiClient.get('/bookings/my-bookings'),
    cancel: (id) => apiClient.delete(`/bookings/${id}`),
    update: (id, data) => apiClient.patch(`/bookings/${id}`, data)
  },

  // Tours
  tours: {
    getAll: (params) => apiClient.get('/tours', params),
    getById: (id) => apiClient.get(`/tours/${id}`),
    search: (query) => apiClient.get('/tours/search', query),
    book: (tourId, data) => apiClient.post(`/tours/${tourId}/book`, data)
  },

  // Transport
  transport: {
    getRoutes: (params) => apiClient.get('/transport/routes', params),
    getVehicles: (params) => apiClient.get('/transport/vehicles', params),
    book: (data) => apiClient.post('/transport/book', data)
  },

  // User
  user: {
    getProfile: () => apiClient.get('/user/profile'),
    updateProfile: (data) => apiClient.patch('/user/profile', data),
    changePassword: (data) => apiClient.post('/user/change-password', data),
    getWatchlist: () => apiClient.get('/user/watchlist'),
    addToWatchlist: (item) => apiClient.post('/user/watchlist', item),
    removeFromWatchlist: (id) => apiClient.delete(`/user/watchlist/${id}`),
    uploadAvatar: (file) => {
      const formData = new FormData()
      formData.append('avatar', file)
      return apiClient.upload('/user/avatar', formData)
    }
  },

  // Payments
  payments: {
    createIntent: (amount, currency) => apiClient.post('/payments/intent', { amount, currency }),
    confirm: (intentId) => apiClient.post(`/payments/${intentId}/confirm`),
    getHistory: () => apiClient.get('/payments/history')
  },

  // Reviews
  reviews: {
    create: (accommodationId, review) => apiClient.post(`/accommodations/${accommodationId}/reviews`, review),
    update: (reviewId, review) => apiClient.patch(`/reviews/${reviewId}`, review),
    delete: (reviewId) => apiClient.delete(`/reviews/${reviewId}`)
  }
}

/**
 * Supabase-based API wrapper
 */
const supabaseApi = {
  // Authentication
  auth: {
    login: async (credentials) => {
      const result = await supabaseAuth.signIn(credentials)
      if (result.error) throw new APIError(result.error.message, 401)
      return { user: result.user, token: result.session?.access_token }
    },
    signup: async (userData) => {
      const result = await supabaseAuth.signUp(userData)
      if (result.error) throw new APIError(result.error.message, 400)
      return { user: result.user, token: result.session?.access_token }
    },
    logout: async () => {
      const { error } = await supabaseAuth.signOut()
      if (error) throw new APIError(error.message, 500)
      return { success: true }
    },
    refreshToken: async () => {
      const session = await supabaseAuth.getSession()
      if (!session) throw new APIError('No session found', 401)
      return { token: session.access_token }
    },
    forgotPassword: (email) => mockApiService.auth.forgotPassword(email),
    resetPassword: (token, password) => mockApiService.auth.resetPassword(token, password),
    verifyEmail: (token) => mockApiService.auth.verifyEmail(token)
  },

  // Accommodations
  accommodations: {
    getAll: async (params) => {
      const result = await supabaseDB.getAccommodations({ filters: params })
      return result || []
    },
    getById: async (id) => {
      const result = await supabaseDB.getAccommodationById(id)
      if (!result) throw new APIError('Accommodation not found', 404)
      return result
    },
    search: async (query) => {
      const result = await supabaseDB.getAccommodations({ filters: query })
      return result || []
    },
    getNearby: (lat, lng, radius) => mockApiService.accommodations.getNearby(lat, lng, radius),
    getReviews: (id) => mockApiService.accommodations.getReviews(id)
  },

  // Bookings
  bookings: {
    create: async (bookingData) => {
      const result = await supabaseDB.createBooking(bookingData)
      if (!result) throw new APIError('Failed to create booking', 500)
      return result
    },
    getById: (id) => mockApiService.bookings.getById(id),
    getMyBookings: async () => {
      const result = await supabaseDB.getUserBookings()
      return result || []
    },
    cancel: (id) => mockApiService.bookings.cancel(id),
    update: (id, data) => mockApiService.bookings.update(id, data)
  },

  // Tours
  tours: {
    getAll: async (params) => {
      const result = await supabaseDB.getTours({ filters: params })
      return result || []
    },
    getById: async (id) => {
      const result = await supabaseDB.getTourById(id)
      if (!result) throw new APIError('Tour not found', 404)
      return result
    },
    search: async (query) => {
      const result = await supabaseDB.getTours({ filters: query })
      return result || []
    },
    book: (tourId, data) => mockApiService.tours.book(tourId, data)
  },

  // Transport
  transport: {
    getRoutes: async (params) => {
      const result = await supabaseDB.getTransportOptions({ filters: params })
      return result || []
    },
    getVehicles: async (params) => {
      const result = await supabaseDB.getTransportOptions({ filters: params })
      return result || []
    },
    book: (data) => mockApiService.transport.book(data)
  },

  // User
  user: {
    getProfile: async () => {
      const result = await supabaseDB.getProfile()
      if (!result) throw new APIError('Profile not found', 404)
      return result
    },
    updateProfile: async (data) => {
      const result = await supabaseDB.updateProfile(data)
      if (!result) throw new APIError('Failed to update profile', 500)
      return result
    },
    changePassword: (data) => mockApiService.user.changePassword(data),
    getWatchlist: () => mockApiService.user.getWatchlist(),
    addToWatchlist: (item) => mockApiService.user.addToWatchlist(item),
    removeFromWatchlist: (id) => mockApiService.user.removeFromWatchlist(id),
    uploadAvatar: (file) => mockApiService.user.uploadAvatar(file)
  },

  // Payments
  payments: {
    createIntent: (amount, currency) => mockApiService.payments.createIntent(amount, currency),
    confirm: (intentId) => mockApiService.payments.confirm(intentId),
    getHistory: () => mockApiService.payments.getHistory()
  },

  // Reviews
  reviews: {
    create: (accommodationId, review) => mockApiService.reviews.create(accommodationId, review),
    update: (reviewId, review) => mockApiService.reviews.update(reviewId, review),
    delete: (reviewId) => mockApiService.reviews.delete(reviewId)
  }
}

// Export the appropriate API based on configuration
export default SUPABASE_URL && !USE_MOCK_API ? supabaseApi : mockApiService
