<template>
  <MainLayout>
    <div class="container mx-auto px-4 lg:px-8 py-8">
      <h1 class="text-3xl font-bold mb-8">Book Transport</h1>
      <Card padding="lg">
        <p class="text-center text-text-secondary py-8">Transport booking interface</p>
      </Card>

      <!-- Accommodation Suggestions -->
      <div class="mt-8">
        <h2 class="text-2xl font-bold mb-6">Places to Stay</h2>
        <p class="text-text-secondary mb-6">Find accommodation at your destination</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <PropertyCard v-for="property in nearbyAccommodations" :key="property.id" :property="property" />
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import MainLayout from '../../components/layout/MainLayout.vue'
import Card from '../../components/common/Card.vue'
import PropertyCard from '../../components/common/PropertyCard.vue'

const nearbyAccommodations = ref([
  {
    id: 1,
    title: 'Airport Hotel',
    location: 'Near Airport',
    price: 90,
    beds: 2,
    baths: 1,
    area: 900,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
    badge: 'Convenient',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&sat=-100',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&crop=left',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&crop=right',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80&crop=top'
    ]
  },
  {
    id: 2,
    title: 'Downtown Apartment',
    location: 'City Center',
    price: 120,
    beds: 3,
    baths: 2,
    area: 1100,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    badge: 'Central',
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&sat=-100',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&crop=left',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&crop=right',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&crop=top'
    ]
  },
  {
    id: 3,
    title: 'Roadside Inn',
    location: 'Highway Access',
    price: 60,
    beds: 2,
    baths: 1,
    area: 700,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    badge: 'Affordable',
    images: [
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&sat=-100',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&crop=left',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&crop=right',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&crop=top'
    ]
  }
])
</script>
