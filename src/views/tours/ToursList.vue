<template>
  <MainLayout>
    <div class="container mx-auto px-4 lg:px-8 py-8">
      <h1 class="text-3xl font-bold mb-2">Discover Amazing Tours</h1>
      <p class="text-text-secondary text-lg mb-8">Unforgettable experiences across Rwanda</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card v-for="tour in tours" :key="tour.id" hover clickable padding="none" @click="router.push(`/tour/${tour.id}`)">
          <div class="relative h-64">
            <img :src="tour.image" :alt="tour.name" class="w-full h-full object-cover rounded-t-card" />
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
              <span class="text-2xl font-bold text-primary">{{ currencyStore.formatPrice(tour.price) }}</span>
            </div>
            <p class="text-text-secondary text-sm">{{ tour.description }}</p>
          </div>
        </Card>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCurrencyStore } from '../../stores/currency'
import MainLayout from '../../components/layout/MainLayout.vue'
import Card from '../../components/common/Card.vue'

const router = useRouter()
const currencyStore = useCurrencyStore()

const tours = ref([
  {
    id: 1,
    name: 'Gorilla Trekking',
    category: 'Adventure',
    duration: '1 Day',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600',
    description: 'Experience mountain gorillas up close'
  },
  {
    id: 2,
    name: 'Kigali City Tour',
    category: 'Cultural',
    duration: '4 Hours',
    price: 50,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600',
    description: 'Explore Rwanda\'s vibrant capital'
  },
  {
    id: 3,
    name: 'Lake Kivu Adventure',
    category: 'Nature',
    duration: '1 Day',
    price: 80,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
    description: 'Island hopping and water activities'
  }
])
</script>
