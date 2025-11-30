<template>
  <MainLayout>
    <div class="container mx-auto px-4 lg:px-8 py-8">
      <!-- Back Button -->
      <button @click="router.back()" class="flex items-center text-text-secondary hover:text-primary mb-6 transition-colors">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
        </svg>
        Back to listings
      </button>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Image Gallery -->
          <div class="grid grid-cols-4 gap-2 rounded-card overflow-hidden">
            <div class="col-span-4 row-span-2 h-96 relative">
              <img :src="accommodation.mainImage" :alt="accommodation.name" class="w-full h-full object-cover" />
              <button class="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-button shadow-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                View all photos
              </button>
            </div>
            <div v-for="(img, index) in accommodation.gallery" :key="index" class="h-32">
              <img :src="img" :alt="`Gallery ${index + 1}`" class="w-full h-full object-cover" />
            </div>
          </div>

          <!-- Header Info -->
          <Card padding="lg">
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <h1 class="text-3xl font-bold text-text-primary">{{ accommodation.name }}</h1>
                  <span v-if="accommodation.eco" class="inline-flex items-center px-3 py-1 bg-success bg-opacity-10 text-success text-sm font-medium rounded-full">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a4 4 0 100 8 4 4 0 000-8z"/>
                    </svg>
                    Eco-Certified
                  </span>
                </div>
                <div class="flex items-center gap-4 text-text-secondary">
                  <span class="flex items-center">
                    <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {{ accommodation.location }}
                  </span>
                  <span class="flex items-center font-semibold text-text-primary">
                    {{ accommodation.rating }} ⭐ 
                    <span class="ml-1 text-text-secondary font-normal">({{ accommodation.reviews }} reviews)</span>
                  </span>
                </div>
              </div>
              <div class="flex gap-2">
                <button class="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path>
                  </svg>
                </button>
                <button class="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </Card>

          <!-- VR/AR Preview -->
          <Card padding="lg">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-2xl font-bold">360° Virtual Tour</h2>
              <span class="px-3 py-1 bg-accent-blue bg-opacity-10 text-accent-blue text-sm font-medium rounded-full">VR/AR Ready</span>
            </div>
            <div class="bg-gray-100 rounded-card h-64 flex items-center justify-center">
              <button class="flex flex-col items-center gap-3 hover:scale-105 transition-transform">
                <div class="w-16 h-16 bg-accent-blue rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <span class="text-accent-blue font-semibold">Launch Virtual Tour</span>
              </button>
            </div>
          </Card>

          <!-- Description -->
          <Card padding="lg">
            <h2 class="text-2xl font-bold mb-4">About this place</h2>
            <p class="text-text-secondary leading-relaxed">{{ accommodation.description }}</p>
          </Card>

          <!-- Amenities -->
          <Card padding="lg">
            <h2 class="text-2xl font-bold mb-4">Amenities</h2>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="amenity in accommodation.amenities" :key="amenity" class="flex items-center gap-3">
                <div class="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span class="text-text-primary">{{ amenity }}</span>
              </div>
            </div>
          </Card>

          <!-- Reviews -->
          <Card padding="lg">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold">Guest Reviews</h2>
              <div class="flex items-center gap-2">
                <span class="text-3xl font-bold text-text-primary">{{ accommodation.rating }}</span>
                <div>
                  <div class="flex text-yellow-500">
                    <span v-for="i in 5" :key="i">⭐</span>
                  </div>
                  <p class="text-sm text-text-secondary">{{ accommodation.reviews }} reviews</p>
                </div>
              </div>
            </div>

            <div class="space-y-6">
              <div v-for="review in accommodation.reviewsList" :key="review.id" class="border-b border-gray-100 pb-6 last:border-0">
                <div class="flex items-start gap-4">
                  <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {{ review.author.charAt(0) }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <div>
                        <h4 class="font-semibold text-text-primary">{{ review.author }}</h4>
                        <p class="text-sm text-text-secondary">{{ review.date }}</p>
                      </div>
                      <div class="flex items-center gap-1">
                        <span class="font-semibold">{{ review.rating }}</span>
                        <span class="text-yellow-500">⭐</span>
                      </div>
                    </div>
                    <p class="text-text-secondary">{{ review.comment }}</p>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" full-width class="mt-6">
              View all {{ accommodation.reviews }} reviews
            </Button>
          </Card>
        </div>

        <!-- Booking Sidebar -->
        <div class="lg:col-span-1">
          <Card padding="lg" class="sticky top-24">
            <div class="mb-6">
              <div class="flex items-baseline gap-2 mb-1">
                <span class="text-4xl font-bold text-primary">{{ currencyStore.formatPrice(accommodation.price) }}</span>
                <span class="text-text-secondary">/night</span>
              </div>
              <p class="text-sm text-text-secondary">Includes taxes and fees</p>
            </div>

            <div class="space-y-4 mb-6">
              <div>
                <label class="block text-sm font-medium mb-2">Check-in</label>
                <input type="date" class="w-full px-4 py-3 border border-gray-200 rounded-button focus:outline-none focus:ring-2 focus:ring-accent-blue" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Check-out</label>
                <input type="date" class="w-full px-4 py-3 border border-gray-200 rounded-button focus:outline-none focus:ring-2 focus:ring-accent-blue" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Guests</label>
                <select class="w-full px-4 py-3 border border-gray-200 rounded-button focus:outline-none focus:ring-2 focus:ring-accent-blue">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5+ Guests</option>
                </select>
              </div>
            </div>

            <Button variant="primary" size="lg" full-width class="mb-3" @click="router.push(`/accommodation/${accommodation.id}/checkout`)">
              Reserve Now
            </Button>
            <p class="text-xs text-center text-text-secondary">You won't be charged yet</p>

            <div class="mt-6 pt-6 border-t border-gray-200 space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-text-secondary">{{ currencyStore.formatPrice(accommodation.price) }} × 3 nights</span>
                <span class="font-semibold">{{ currencyStore.formatPrice(accommodation.price * 3) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-text-secondary">Service fee</span>
                <span class="font-semibold">$25</span>
              </div>
              <div class="flex justify-between pt-3 border-t border-gray-200">
                <span class="font-semibold">Total</span>
                <span class="text-xl font-bold text-primary">{{ currencyStore.formatPrice(accommodation.price * 3 + 25) }}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCurrencyStore } from '../../stores/currency'
import MainLayout from '../../components/layout/MainLayout.vue'
import Card from '../../components/common/Card.vue'
import Button from '../../components/common/Button.vue'

const router = useRouter()
const route = useRoute()
const currencyStore = useCurrencyStore()

const accommodation = ref({
  id: route.params.id,
  name: 'Kigali Serena Hotel',
  location: 'Kigali, Rwanda',
  price: 150,
  rating: 4.8,
  reviews: 324,
  eco: true,
  mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
  gallery: [
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=400'
  ],
  description: 'Experience luxury in the heart of Kigali at the Serena Hotel. Our eco-certified property combines modern comfort with traditional Rwandan hospitality. Featuring stunning views, world-class dining, and exceptional service, we ensure your stay is memorable.',
  amenities: [
    'Free WiFi',
    'Swimming Pool',
    'Restaurant & Bar',
    'Spa & Wellness',
    'Fitness Center',
    'Room Service',
    'Air Conditioning',
    'Parking',
    'Conference Rooms',
    'Airport Shuttle',
    'Laundry Service',
    'Concierge'
  ],
  reviewsList: [
    {
      id: 1,
      author: 'Sarah Johnson',
      date: 'November 2025',
      rating: 5.0,
      comment: 'Absolutely wonderful stay! The staff was incredibly welcoming and the facilities were top-notch. The eco-friendly practices were impressive too.'
    },
    {
      id: 2,
      author: 'Michael Chen',
      date: 'October 2025',
      rating: 4.5,
      comment: 'Great location in the heart of Kigali. Rooms were spacious and clean. The restaurant served delicious local and international cuisine.'
    },
    {
      id: 3,
      author: 'Emma Williams',
      date: 'September 2025',
      rating: 5.0,
      comment: 'Perfect for business and leisure. The conference facilities were excellent and the pool area was a great place to unwind.'
    }
  ]
})
</script>
