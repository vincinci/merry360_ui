import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCurrencyStore = defineStore('currency', () => {
  // Exchange rate: 1 USD = 1300 RWF (approximate as of 2025)
  const exchangeRate = ref(1300)
  
  // Current currency: 'USD' or 'RWF'
  const currentCurrency = ref('USD')
  
  // Toggle between currencies
  const toggleCurrency = () => {
    currentCurrency.value = currentCurrency.value === 'USD' ? 'RWF' : 'USD'
  }
  
  // Convert price based on current currency
  const convertPrice = (priceInUSD) => {
    if (currentCurrency.value === 'RWF') {
      return priceInUSD * exchangeRate.value
    }
    return priceInUSD
  }
  
  // Format price with proper currency symbol
  const formatPrice = (priceInUSD) => {
    const convertedPrice = convertPrice(priceInUSD)
    const formatted = new Intl.NumberFormat('en-US').format(convertedPrice)
    
    if (currentCurrency.value === 'RWF') {
      return `${formatted} RWF`
    }
    return `$${formatted}`
  }
  
  // Get currency symbol
  const currencySymbol = computed(() => {
    return currentCurrency.value === 'USD' ? '$' : 'RWF'
  })
  
  return {
    currentCurrency,
    exchangeRate,
    toggleCurrency,
    convertPrice,
    formatPrice,
    currencySymbol
  }
})
