<template>
  <PropertyLayout>
    <!-- Hero Section -->
    <section class="relative bg-gray-50 py-8 md:py-12">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-text-primary">Transportation Services</h1>
          <p class="text-sm md:text-base text-text-secondary">Get around Rwanda with ease</p>
        </div>
      </div>
    </section>

    <!-- Service Cards -->
    <section class="py-12 md:py-16">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <!-- Taxi Service -->
          <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div class="p-8 text-center">
              <div class="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-text-primary mb-2">Taxi Service</h3>
              <p class="text-sm text-text-secondary mb-4">Quick rides around the city</p>
              <button @click="bookService('taxi')" class="w-full px-5 py-2.5 bg-primary text-sm text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">
                Book Taxi
              </button>
            </div>
          </div>

          <!-- Shuttle Service -->
          <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div class="p-8 text-center">
              <div class="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg class="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-text-primary mb-2">Shuttle Service</h3>
              <p class="text-sm text-text-secondary mb-4">Shared rides to popular destinations</p>
              <button @click="bookService('shuttle')" class="w-full px-5 py-2.5 bg-gray-900 text-sm text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors">
                Book Shuttle
              </button>
            </div>
          </div>

          <!-- Car Rental -->
          <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div class="p-8 text-center">
              <div class="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg class="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-text-primary mb-2">Car Rental</h3>
              <p class="text-sm text-text-secondary mb-4">Rent a vehicle for your journey</p>
              <button @click="browseCars" class="w-full px-5 py-2.5 border-2 border-primary text-sm text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-colors">
                Browse Cars
              </button>
            </div>
          </div>
        </div>

        <!-- Popular Routes Section -->
        <div class="mt-12">
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-text-primary mb-6 text-center">Popular Routes</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div v-for="route in popularRoutes" :key="route.id" class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 text-text-primary font-semibold mb-2">
                    <svg class="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="3"></circle>
                    </svg>
                    {{ route.from }}
                  </div>
                  <div class="flex items-center gap-2 text-text-secondary">
                    <svg class="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    {{ route.to }}
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-2xl font-bold text-primary">{{ route.price }}</div>
                  <div class="text-xs text-text-muted">{{ route.duration }}</div>
                </div>
              </div>
              <button @click="bookRoute(route)" class="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-text-primary rounded-lg font-medium transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-text-primary">24/7 Service</h4>
            <p class="text-sm text-text-secondary">Available anytime</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-text-primary">Verified Drivers</h4>
            <p class="text-sm text-text-secondary">Safe & reliable</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-text-primary">Best Prices</h4>
            <p class="text-sm text-text-secondary">Affordable rates</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h4 class="font-semibold text-text-primary">Easy Booking</h4>
            <p class="text-sm text-text-secondary">Quick process</p>
          </div>
        </div>
      </div>
    </section>
  </PropertyLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/userStore'
import PropertyLayout from '../../components/layout/PropertyLayout.vue'

const router = useRouter()
const userStore = useUserStore()

const popularRoutes = ref([
  { id: 1, from: 'Kigali', to: 'Musanze', price: '15,000 RWF', duration: '2.5 hrs' },
  { id: 2, from: 'Kigali', to: 'Rubavu', price: '18,000 RWF', duration: '3 hrs' },
  { id: 3, from: 'Kigali', to: 'Huye', price: '12,000 RWF', duration: '2 hrs' },
  { id: 4, from: 'Musanze', to: 'Rubavu', price: '10,000 RWF', duration: '1.5 hrs' },
  { id: 5, from: 'Kigali', to: 'Nyagatare', price: '20,000 RWF', duration: '3.5 hrs' },
  { id: 6, from: 'Kigali', to: 'Rusizi', price: '22,000 RWF', duration: '4 hrs' }
])

const bookService = (type) => {
  const serviceItem = {
    id: Date.now(),
    type: 'transport',
    service: type,
    name: `${type.charAt(0).toUpperCase() + type.slice(1)} Service`,
    price: type === 'taxi' ? 5000 : type === 'shuttle' ? 3000 : 50000,
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80'
  }
  userStore.addToCart(serviceItem)
  alert(`${serviceItem.name} added to cart!`)
}

const browseCars = () => {
  alert('Car rental catalog coming soon!')
}

const bookRoute = (route) => {
  const routeItem = {
    id: Date.now(),
    type: 'transport',
    service: 'route',
    name: `${route.from} → ${route.to}`,
    price: parseInt(route.price.replace(/[^0-9]/g, '')),
    duration: route.duration,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80'
  }
  userStore.addToCart(routeItem)
  alert(`Route ${route.from} → ${route.to} added to cart!`)
}
</script>
