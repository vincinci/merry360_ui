<template>
  <MainLayout>
    <!-- Search Bar Section -->
    <div class="w-full py-12" style="margin-top: 80px;">
      <div class="container mx-auto px-4 max-w-4xl">
        <div class="bg-white rounded-[20px] md:rounded-[35px] shadow-2xl p-3 md:p-2 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-0" style="min-height: 70px;">
          <div class="flex-1 px-2 md:px-6">
            <label class="block text-xs font-bold mb-1.5" style="font-family: Montserrat, sans-serif; color: #484848; font-size: 12px;">Search Tours</label>
            <input 
              v-model="searchQuery"
              type="text" 
              :placeholder="t('placeholder.searchTours')"
              class="w-full text-sm font-semibold focus:outline-none placeholder-gray-400"
              style="font-family: Montserrat, sans-serif; color: #484848; font-size: 14px;"
              @keyup.enter="performSearch"
            />
          </div>
          <button 
            @click="performSearch"
            class="w-full md:w-[54px] h-[54px] rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 flex-shrink-0 md:mr-2 shadow-lg"
            style="background: #FE4F4F;"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 lg:px-8 py-8">
      <h1 class="text-3xl font-bold mb-2">Discover Amazing Tours</h1>
      <p class="text-text-secondary text-lg mb-8">Unforgettable experiences across Rwanda</p>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>

      <!-- Empty State -->
      <div v-else-if="tours.length === 0" class="text-center py-20">
        <svg class="w-24 h-24 mx-auto mb-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
        </svg>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No Tours Available</h3>
        <p class="text-gray-500 mb-8">There are no tours listed yet. Check back soon!</p>
      </div>

      <!-- Tours Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card v-for="tour in tours" :key="tour.id" hover clickable padding="none" @click="router.push(`/tour/${tour.id}`)">
          <div class="relative h-64">
            <img loading="lazy" :src="tour.image" :alt="tour.name" class="w-full h-full object-cover rounded-t-card" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <span class="inline-block px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs mb-2">{{ tour.category }}</span>
              <h3 class="font-bold text-xl">{{ tour.name }}</h3>
            </div>
          </div>
          <div class="p-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-text-secondary text-sm flex items-center">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                {{ tour.duration }}
              </span>
              <span class="text-2xl font-bold text-brand-600">{{ currencyStore.formatPrice(tour.price) }}</span>
            </div>
            <p class="text-text-secondary text-sm">{{ tour.description }}</p>
          </div>
        </Card>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrencyStore } from '../../stores/currency'
import MainLayout from '../../components/layout/MainLayout.vue'
import Card from '../../components/common/Card.vue'
import api from '../../services/api'

const router = useRouter()
const currencyStore = useCurrencyStore()

const searchQuery = ref('')

const performSearch = () => {
  if (searchQuery.value.trim()) {
    console.log('Searching tours for:', searchQuery.value)
  }
}

const tours = ref([])
const loading = ref(true)

// Fetch tours from API
onMounted(async () => {
  try {
    const response = await api.tours.getAll()
    tours.value = response.data.map(tour => ({
      id: tour.id,
      name: tour.title,
      category: tour.category || 'Adventure',
      duration: tour.duration,
      price: tour.price,
      image: tour.images?.[0] || 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600',
      description: tour.description
    }))
  } catch (error) {
    console.error('Failed to load tours:', error)
  } finally {
    loading.value = false
  }
})
</script>
