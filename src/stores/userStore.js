import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // Load initial state from localStorage
  const savedUser = localStorage.getItem('user')
  const savedAuth = localStorage.getItem('isAuthenticated')
  
  // User data
  const user = ref(savedUser ? JSON.parse(savedUser) : null)
  const isAuthenticated = ref(savedAuth === 'true')
  
  // Watchlist / Saved Items
  const watchlist = ref([])
  
  // Loyalty Points
  const loyaltyPoints = ref(0)
  const loyaltyTier = ref('bronze') // bronze, silver, gold, platinum
  
  // User preferences
  const preferences = ref({
    language: 'EN', // EN, RW, FR, ZH
    currency: 'RWF',
    theme: 'light', // light, dark
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    sustainableTravel: false
  })
  
  // Bookings
  const upcomingBookings = ref([])
  const pastBookings = ref([])
  
  // Trip cart
  const tripCart = ref([])
  
  // Subscription
  const subscription = ref({
    active: false,
    tier: null, // basic, premium, vip
    expiresAt: null
  })
  
  // Computed properties
  const watchlistCount = computed(() => watchlist.value.length)
  const cartCount = computed(() => tripCart.value.length)
  const nextTierPoints = computed(() => {
    const tiers = { bronze: 1000, silver: 5000, gold: 15000, platinum: 50000 }
    const current = loyaltyPoints.value
    const next = Object.entries(tiers).find(([tier, points]) => current < points)
    return next ? next[1] - current : 0
  })
  
  // Actions
  const login = (userData) => {
    user.value = userData
    isAuthenticated.value = true
    // Persist to localStorage
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isAuthenticated', 'true')
  }
  
  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    watchlist.value = []
    tripCart.value = []
    // Clear localStorage
    localStorage.removeItem('user')
    localStorage.removeItem('isAuthenticated')
  }
  
  const addToWatchlist = (item) => {
    const exists = watchlist.value.find(w => w.id === item.id && w.type === item.type)
    if (!exists) {
      watchlist.value.push({
        ...item,
        savedAt: new Date().toISOString()
      })
    }
  }
  
  const removeFromWatchlist = (id, type) => {
    watchlist.value = watchlist.value.filter(w => !(w.id === id && w.type === type))
  }
  
  const isInWatchlist = (id, type) => {
    return watchlist.value.some(w => w.id === id && w.type === type)
  }
  
  const addToCart = (item) => {
    const exists = tripCart.value.find(c => c.id === item.id && c.type === item.type)
    if (!exists) {
      tripCart.value.push({
        ...item,
        addedAt: new Date().toISOString()
      })
    }
  }
  
  const removeFromCart = (id, type) => {
    tripCart.value = tripCart.value.filter(c => !(c.id === id && c.type === type))
  }
  
  const clearCart = () => {
    tripCart.value = []
  }
  
  const addLoyaltyPoints = (points) => {
    loyaltyPoints.value += points
    updateLoyaltyTier()
  }
  
  const redeemPoints = (points) => {
    if (loyaltyPoints.value >= points) {
      loyaltyPoints.value -= points
      updateLoyaltyTier()
      return true
    }
    return false
  }
  
  const updateLoyaltyTier = () => {
    const points = loyaltyPoints.value
    if (points >= 50000) loyaltyTier.value = 'platinum'
    else if (points >= 15000) loyaltyTier.value = 'gold'
    else if (points >= 5000) loyaltyTier.value = 'silver'
    else loyaltyTier.value = 'bronze'
  }
  
  const setLanguage = (lang) => {
    preferences.value.language = lang
  }
  
  const toggleTheme = () => {
    preferences.value.theme = preferences.value.theme === 'light' ? 'dark' : 'light'
  }
  
  const updateSubscription = (tier, expiresAt) => {
    subscription.value = {
      active: true,
      tier,
      expiresAt
    }
  }
  
  return {
    // State
    user,
    isAuthenticated,
    watchlist,
    loyaltyPoints,
    loyaltyTier,
    preferences,
    upcomingBookings,
    pastBookings,
    tripCart,
    subscription,
    
    // Computed
    watchlistCount,
    cartCount,
    nextTierPoints,
    
    // Actions
    login,
    logout,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    addToCart,
    removeFromCart,
    clearCart,
    addLoyaltyPoints,
    redeemPoints,
    setLanguage,
    toggleTheme,
    updateSubscription
  }
})
