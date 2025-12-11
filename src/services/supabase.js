/**
 * Supabase Service
 * Database and Authentication Backend
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Initialize Supabase client
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')

/**
 * Authentication Service
 */
export const supabaseAuth = {
  /**
   * Sign up with email and password
   */
  async signUp(email, password, userData = {}) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    
    if (error) throw error
    return data
  },

  /**
   * Sign in with email and password
   */
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  /**
   * Sign in with Google OAuth
   */
  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (error) throw error
    return data
  },

  /**
   * Sign out
   */
  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  /**
   * Get current user
   */
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  /**
   * Get current session
   */
  async getSession() {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (error) throw error
    return session
  },

  /**
   * Listen to auth state changes
   */
  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback)
  }
}

/**
 * Database Service
 */
export const supabaseDB = {
  /**
   * Get all accommodations
   */
  async getAccommodations(filters = {}) {
    let query = supabase
      .from('accommodations')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.type) {
      query = query.eq('type', filters.type)
    }
    if (filters.minPrice) {
      query = query.gte('price', filters.minPrice)
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice)
    }
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }
    if (filters.ecoFriendly) {
      query = query.eq('eco_friendly', true)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  /**
   * Get accommodation by ID
   */
  async getAccommodationById(id) {
    const { data, error } = await supabase
      .from('accommodations')
      .select('*, reviews(*), host:hosts(*)')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Get all tours
   */
  async getTours(filters = {}) {
    let query = supabase
      .from('tours')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (filters.category && filters.category !== 'all') {
      query = query.eq('category', filters.category)
    }
    if (filters.maxPrice) {
      query = query.lte('price', filters.maxPrice)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  /**
   * Get tour by ID
   */
  async getTourById(id) {
    const { data, error } = await supabase
      .from('tours')
      .select('*, reviews(*)')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  /**
   * Get transport options
   */
  async getTransportOptions(filters = {}) {
    let query = supabase
      .from('transport')
      .select('*')
      .eq('available', true)

    if (filters.type) {
      query = query.eq('type', filters.type)
    }

    const { data, error } = await query
    if (error) throw error
    return data
  },

  /**
   * Create booking
   */
  async createBooking(bookingData) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Get user bookings
   */
  async getUserBookings(userId) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, accommodation:accommodations(*), tour:tours(*)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data
  },

  /**
   * Update user profile
   */
  async updateProfile(userId, profileData) {
    const { data, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  /**
   * Get user profile
   */
  async getProfile(userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  }
}

export default supabase
