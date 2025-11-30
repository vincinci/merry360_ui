<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <router-link to="/home" class="flex items-center">
            <img src="/logo.png" alt="Merry360" class="h-16" />
          </router-link>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-6">
            <router-link 
              to="/home" 
              class="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Home
            </router-link>
            <router-link 
              to="/accommodations" 
              class="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Accommodations
            </router-link>
            <router-link 
              to="/tours" 
              class="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Tours
            </router-link>
            <router-link 
              to="/transport" 
              class="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Transport
            </router-link>
            <router-link 
              to="/services" 
              class="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              Services
            </router-link>
            <router-link 
              to="/dashboard" 
              class="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              My Trips
            </router-link>
          </nav>

          <!-- Desktop Right -->
          <div class="hidden md:flex items-center gap-2">
            <!-- Currency Toggle -->
            <button 
              @click="currencyStore.toggleCurrency()"
              class="px-3 py-1.5 border border-gray-200 rounded text-xs font-semibold text-gray-900 hover:border-primary hover:text-primary transition-all bg-white flex items-center gap-1"
              :title="'Switch to ' + (currencyStore.currentCurrency === 'USD' ? 'RWF' : 'USD')"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ currencyStore.currentCurrency }}
            </button>

            <select v-model="selectedLanguage" @change="changeLanguage" class="px-2 py-1 border border-gray-200 rounded text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-primary bg-white">
              <option value="EN">EN</option>
              <option value="RW">RW</option>
              <option value="FR">FR</option>
            </select>

            <router-link to="/dashboard/watchlist" class="relative p-1.5 hover:bg-gray-50 rounded" title="Wishlist">
              <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </router-link>

            <router-link to="/trip-cart" class="relative p-1.5 hover:bg-gray-50 rounded" title="Cart">
              <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </router-link>

            <router-link 
              to="/login"
              class="px-4 py-1.5 border border-primary text-primary text-sm rounded hover:bg-primary hover:text-white transition-colors font-medium"
            >
              Login
            </router-link>
          </div>

          <!-- Mobile Right -->
          <div class="flex md:hidden items-center gap-1">
            <!-- Currency Toggle Mobile -->
            <button 
              @click="currencyStore.toggleCurrency()"
              class="px-2 py-1 border border-gray-200 rounded text-[10px] font-bold text-gray-900 hover:border-primary hover:text-primary transition-all bg-white"
            >
              {{ currencyStore.currentCurrency }}
            </button>

            <router-link to="/dashboard/watchlist" class="relative p-1.5">
              <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </router-link>

            <router-link to="/trip-cart" class="relative p-1.5">
              <svg class="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </router-link>

            <button 
              @click="toggleMobileMenu"
              class="p-1.5 text-gray-900"
              aria-label="Menu"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path v-if="!showMobileMenu" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Menu Drawer -->
    <transition name="mobile-menu">
      <div v-if="showMobileMenu" class="fixed inset-0 z-40 md:hidden">
        <!-- Backdrop -->
        <div 
          class="fixed inset-0 bg-black/50 backdrop-blur-sm"
          @click="showMobileMenu = false"
        ></div>
        
        <!-- Menu Panel -->
        <div class="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl">
          <div class="p-4">
            <nav class="space-y-1">
              <router-link 
                v-for="item in mobileNavigation"
                :key="item.name"
                :to="item.to"
                class="block py-3 px-4 text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                @click="showMobileMenu = false"
              >
                {{ item.name }}
              </router-link>
              
              <div class="pt-4 border-t">
                <router-link 
                  to="/login"
                  class="block py-3 px-4 text-center bg-primary text-white rounded-lg hover:bg-red-600 transition-colors"
                  @click="showMobileMenu = false"
                >
                  Login
                </router-link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </transition>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="glass-dark border-t border-white/20 mt-20 backdrop-blur-xl relative overflow-hidden african-pattern">
      <div class="container mx-auto px-4 lg:px-8 py-16 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <div class="flex items-center space-x-3 mb-6">
              <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary rounded-2xl flex items-center justify-center shadow-african">
                <span class="text-white font-bold text-2xl">M</span>
              </div>
              <span class="text-xl font-bold text-white tracking-tight">Merry<span class="text-red-300">360X</span></span>
            </div>
            <p class="text-white/80 text-sm leading-relaxed">Discover the warmth of African hospitality with modern travel solutions.</p>
          </div>
          <div>
            <h4 class="font-bold mb-5 text-red-300 text-base">Explore</h4>
            <ul class="space-y-3 text-white/70 text-sm">
              <li><router-link to="/accommodations" class="hover:text-red-300 transition-all hover:translate-x-1 inline-block">🏠 Accommodations</router-link></li>
              <li><router-link to="/tours" class="hover:text-red-300 transition-all hover:translate-x-1 inline-block">🌍 Tours</router-link></li>
              <li><router-link to="/transport" class="hover:text-red-300 transition-all hover:translate-x-1 inline-block">🚗 Transport</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-5 text-red-300 text-base">Company</h4>
            <ul class="space-y-3 text-white/70 text-sm">
              <li><a href="#" class="hover:text-red-300 transition-all hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" class="hover:text-red-300 transition-all hover:translate-x-1 inline-block">Contact</a></li>
              <li><a href="#" class="hover:text-red-300 transition-all hover:translate-x-1 inline-block">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold mb-5 text-red-300 text-base">Support</h4>
            <ul class="space-y-3 text-white/70 text-sm">
              <li><a href="#" class="hover:text-red-300 transition-all hover:translate-x-1 inline-block">Help Center</a></li>
              <li><a href="#" class="hover:text-red-300 transition-all hover:translate-x-1 inline-block">Safety</a></li>
              <li><a href="#" class="hover:text-red-300 transition-all hover:translate-x-1 inline-block">Terms</a></li>
            </ul>
          </div>
        </div>
        <div class="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p class="text-white/60 text-sm">© 2025 Merry360X. Crafted with ❤️ in Africa</p>
          <div class="flex space-x-6 mt-4 md:mt-0">
            <a href="#" class="text-white/60 hover:text-red-300 text-sm transition-colors">Privacy</a>
            <a href="#" class="text-white/60 hover:text-red-300 text-sm transition-colors">Terms</a>
            <a href="#" class="text-white/60 hover:text-red-300 text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app'
import { useCurrencyStore } from '../../stores/currency'

const router = useRouter()
const appStore = useAppStore()
const currencyStore = useCurrencyStore()

const showMobileMenu = ref(false)
const selectedLanguage = ref('EN')

const mobileNavigation = [
  { name: 'Home', to: '/home' },
  { name: 'Accommodations', to: '/accommodations' },
  { name: 'Tours', to: '/tours' },
  { name: 'Transport', to: '/transport' },
  { name: 'Services', to: '/services' },
  { name: 'My Trips', to: '/dashboard' }
]

const changeLanguage = () => {
  console.log('Language changed to:', selectedLanguage.value)
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}
</script>
