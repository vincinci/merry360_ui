<template>
  <MainLayout>
    <div class="container mx-auto px-4 lg:px-8 py-8">
      <h1 class="text-3xl font-bold mb-2">Transportation Services</h1>
      <p class="text-text-secondary text-lg mb-8">Get around Rwanda with ease</p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card hover clickable padding="lg" class="text-center">
          <div class="w-20 h-20 bg-primary bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Taxi Service</h3>
          <p class="text-text-secondary mb-4">Quick rides around the city</p>
          <Button variant="primary">Book Taxi</Button>
        </Card>

        <Card hover clickable padding="lg" class="text-center">
          <div class="w-20 h-20 bg-accent-blue bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-accent-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Shuttle Service</h3>
          <p class="text-text-secondary mb-4">Shared rides to popular destinations</p>
          <Button variant="success">Book Shuttle</Button>
        </Card>

        <Card hover clickable padding="lg" class="text-center">
          <div class="w-20 h-20 bg-success bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Car Rental</h3>
          <p class="text-text-secondary mb-4">Rent a vehicle for your journey</p>
          <Button variant="outline">Browse Cars</Button>
        </Card>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '../../components/layout/MainLayout.vue'
import Card from '../../components/common/Card.vue'
import Button from '../../components/common/Button.vue'
</script>
