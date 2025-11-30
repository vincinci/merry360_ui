<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white/95 border-b border-gray-100 sticky top-0 z-50 backdrop-blur-xl shadow-sm">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <router-link to="/home" class="flex items-center space-x-3 group">
            <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary rounded-2xl flex items-center justify-center shadow-african transform transition-transform group-hover:scale-110 group-hover:rotate-3">
              <span class="text-white font-bold text-2xl">M</span>
            </div>
            <span class="text-xl font-bold text-text-primary tracking-tight">Merry<span class="text-primary">360X</span></span>
          </router-link>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-6">
            <router-link 
              to="/accommodations" 
              class="text-text-primary hover:text-primary transition-all font-bold text-base relative group"
            >
              Stays
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary group-hover:w-full transition-all duration-300"></span>
            </router-link>
            <router-link 
              to="/tours" 
              class="text-text-primary hover:text-primary transition-all font-bold text-base relative group"
            >
              Tours
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary group-hover:w-full transition-all duration-300"></span>
            </router-link>
            <router-link 
              to="/transport" 
              class="text-text-primary hover:text-primary transition-all font-bold text-base relative group"
            >
              Transport
              <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary group-hover:w-full transition-all duration-300"></span>
            </router-link>
            <button class="glass-primary text-text-primary hover:glass-strong transition-all font-semibold text-xs px-3 py-1.5 rounded-lg flex items-center">
              <svg class="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              {{ currentLanguage.toUpperCase() }}
            </button>
          </nav>

          <!-- Right Section -->
          <div class="flex items-center space-x-4">
            <!-- AI Concierge Button -->
            <button class="hidden md:flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary text-white hover:shadow-african transition-all font-semibold text-sm transform hover:scale-105 border border-white/30">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
              <span>AI Help</span>
            </button>

            <!-- User Menu -->
            <div v-if="isAuthenticated" class="relative">
              <button @click="toggleUserMenu" class="flex items-center space-x-2 group">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-primary to-primary flex items-center justify-center text-white font-bold text-lg shadow-african transform transition-transform group-hover:scale-110">
                  {{ user?.name?.charAt(0) || 'U' }}
                </div>
              </button>
              <div v-if="showUserMenu" class="absolute right-0 mt-3 w-56 glass-strong rounded-card shadow-african border border-white/40 py-2 backdrop-blur-xl">
                <router-link to="/dashboard" class="block px-5 py-3 hover:glass text-text-primary transition-all font-semibold text-sm rounded-lg mx-2">Dashboard</router-link>
                <router-link to="/dashboard" class="block px-5 py-3 hover:glass text-text-primary transition-all font-semibold text-sm rounded-lg mx-2">My Bookings</router-link>
                <div class="border-t border-white/20 my-2"></div>
                <button @click="handleLogout" class="w-full text-left px-5 py-3 hover:glass-primary text-error transition-all font-semibold text-sm rounded-lg mx-2">Logout</button>
              </div>
            </div>
            <router-link v-else to="/login">
              <Button variant="primary" size="sm">Sign In</Button>
            </router-link>

            <!-- Mobile Menu Toggle -->
            <button @click="toggleMobileMenu" class="md:hidden">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Menu -->
    <div v-if="showMobileMenu" class="md:hidden bg-white border-b border-gray-200 shadow-xl animate-fade-in-up">
      <nav class="container mx-auto px-4 py-4 space-y-1">
        <router-link to="/accommodations" class="block py-3 px-4 text-text-primary hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium">Stays</router-link>
        <router-link to="/tours" class="block py-3 px-4 text-text-primary hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium">Tours</router-link>
        <router-link to="/transport" class="block py-3 px-4 text-text-primary hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium">Transport</router-link>
        <button class="flex items-center space-x-2 py-3 px-4 text-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary hover:bg-opacity-5 rounded-lg transition-all duration-200 w-full font-medium">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
          </svg>
          <span>AI Help</span>
        </button>
      </nav>
    </div>

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
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '../../stores/app'
import Button from '../common/Button.vue'

const router = useRouter()
const appStore = useAppStore()

const showMobileMenu = ref(false)
const showUserMenu = ref(false)

const isAuthenticated = computed(() => appStore.isAuthenticated)
const user = computed(() => appStore.user)
const currentLanguage = computed(() => appStore.currentLanguage)

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
}

const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

const handleLogout = () => {
  appStore.logout()
  showUserMenu.value = false
  router.push('/login')
}
</script>
