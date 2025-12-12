<template>
  <MainLayout>
    <!-- Hero Header -->
    <section class="bg-gradient-to-br from-brand-50 to-red-50 dark:from-gray-800 dark:to-gray-900 py-8 md:py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Your Trip Cart</h1>
            <p class="text-gray-600 dark:text-gray-300">Review and manage your selected items</p>
          </div>
          <div v-if="cartCount > 0" class="hidden md:flex items-center gap-3">
            <div class="text-right">
              <p class="text-sm text-gray-600 dark:text-gray-400">Total Items</p>
              <p class="text-2xl font-bold text-brand-500 dark:text-red-400">{{ cartCount }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Cart Content -->
    <section class="py-8 md:py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Empty State -->
        <div v-if="cartCount === 0" class="max-w-2xl mx-auto">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
            <div class="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Your Trip Cart is Empty</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-8">Start adding accommodations, tours, and experiences to plan your perfect trip!</p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button @click="router.push('/accommodations')" class="px-6 py-3 bg-brand-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all hover:scale-105 shadow-lg">
                Browse Accommodations
              </button>
              <button @click="router.push('/tours')" class="px-6 py-3 border-2 border-brand-500 text-brand-500 dark:border-red-400 dark:text-red-400 rounded-xl font-semibold hover:bg-brand-50 dark:hover:bg-gray-700 transition-all">
                Explore Tours
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Items -->
        <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <!-- Items List -->
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">Items in Cart ({{ cartCount }})</h2>
              <button 
                @click="clearAllItems" 
                class="text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
                Clear All
              </button>
            </div>
            
            <div v-for="item in tripCart" :key="`${item.type}-${item.id}`" class="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all group">
              <div class="flex flex-col sm:flex-row">
                <!-- Image -->
                <div class="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
                  <img loading="lazy" 
                    :src="item.image" 
                    :alt="item.name || item.title" 
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div class="absolute top-3 left-3">
                    <span class="px-3 py-1 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm text-brand-600 dark:text-red-400 text-xs font-bold rounded-full uppercase shadow-lg">
                      {{ item.type }}
                    </span>
                  </div>
                </div>

                <!-- Content -->
                <div class="flex-1 p-5 sm:p-6">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex-1">
                      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand-500 dark:group-hover:text-red-400 transition-colors">
                        {{ item.name || item.title }}
                      </h3>
                      <div class="space-y-1">
                        <div v-if="item.location" class="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                          </svg>
                          {{ item.location }}
                        </div>
                        <div v-if="item.duration" class="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          {{ item.duration }}
                        </div>
                      </div>
                    </div>
                    <button 
                      @click="removeItem(item)" 
                      class="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      title="Remove item"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>

                  <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div class="text-2xl font-bold text-brand-600 dark:text-red-400">
                      {{ currencyStore.formatPrice(typeof item.price === 'string' ? parseInt(item.price.replace(/[^0-9]/g, '')) : item.price) }}
                    </div>
                    <button class="text-sm text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-red-400 font-medium flex items-center gap-1 transition-colors">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                      </svg>
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <svg class="w-5 h-5 text-brand-500 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                Order Summary
              </h3>
              
              <div class="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div class="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal ({{ cartCount }} {{ cartCount === 1 ? 'item' : 'items' }})</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ currencyStore.formatPrice(subtotal) }}</span>
                </div>
                <div class="flex justify-between text-gray-600 dark:text-gray-300">
                  <span class="flex items-center gap-1">
                    Service Fee
                    <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ currencyStore.formatPrice(serviceFee) }}</span>
                </div>
                <div class="flex justify-between text-green-600 dark:text-green-400">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Loyalty Discount
                  </span>
                  <span class="font-semibold">-{{ currencyStore.formatPrice(discount) }}</span>
                </div>
              </div>

              <div class="flex justify-between text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <span class="text-brand-600 dark:text-red-400">{{ currencyStore.formatPrice(total) }}</span>
              </div>

              <!-- Loyalty Points -->
              <div class="mb-6 p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-2">
                    <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">Loyalty Points</span>
                  </div>
                  <span class="text-sm font-bold text-amber-600 dark:text-amber-400">{{ loyaltyPoints }} pts</span>
                </div>
                <div class="flex items-center gap-2">
                  <input 
                    v-model="pointsToUse" 
                    type="number" 
                    :max="loyaltyPoints"
                    min="0"
                    placeholder="Points to use"
                    class="flex-1 px-3 py-2 border border-amber-300 dark:border-amber-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400"
                  />
                  <button 
                    @click="applyPoints" 
                    class="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button 
                @click="proceedToCheckout" 
                class="w-full px-6 py-4 bg-gradient-to-r from-brand-500 to-red-600 text-white rounded-xl font-bold text-lg hover:from-brand-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 mb-3"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
                Proceed to Checkout
              </button>

              <button 
                @click="router.push('/accommodations')" 
                class="w-full px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-brand-500 hover:text-brand-500 dark:hover:border-red-400 dark:hover:text-red-400 transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Continue Shopping
              </button>

              <!-- Trust Badges -->
              <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                    Secure Checkout
                  </div>
                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Best Price
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore'
import { useCurrencyStore } from '../../stores/currency'
import MainLayout from '../../components/layout/MainLayout.vue'

const router = useRouter()
const userStore = useUserStore()
const currencyStore = useCurrencyStore()

const pointsToUse = ref(0)

const tripCart = computed(() => userStore.tripCart)
const cartCount = computed(() => userStore.cartCount)
const loyaltyPoints = computed(() => userStore.loyaltyPoints)

const subtotal = computed(() => {
  return tripCart.value.reduce((sum, item) => {
    const price = typeof item.price === 'string' 
      ? parseInt(item.price.replace(/[^0-9]/g, '')) 
      : item.price
    return sum + (price || 0)
  }, 0)
})

const serviceFee = computed(() => Math.round(subtotal.value * 0.05))
const discount = computed(() => Math.round(subtotal.value * 0.02))
const total = computed(() => subtotal.value + serviceFee.value - discount.value)

const removeItem = (item) => {
  userStore.removeFromCart(item.id, item.type)
}

const clearAllItems = () => {
  if (confirm('Are you sure you want to clear your cart?')) {
    userStore.clearCart()
  }
}

const applyPoints = () => {
  if (pointsToUse.value > loyaltyPoints.value) {
    alert('Insufficient loyalty points!')
    pointsToUse.value = loyaltyPoints.value
  } else if (pointsToUse.value > 0) {
    alert(`${pointsToUse.value} points will be applied at checkout!`)
  }
}

const proceedToCheckout = () => {
  alert('Checkout functionality coming soon! Your total: ' + currencyStore.formatPrice(total.value))
}
</script>
