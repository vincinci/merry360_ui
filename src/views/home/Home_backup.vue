<template>
  <MainLayout>
    <!-- Hero Section with Search -->
    <section class="relative overflow-hidden py-20 px-4 african-pattern">
      <div class="absolute inset-0 bg-gradient-to-br from-teal-500 via-cyan-600 to-blue-500 opacity-90"></div>
      <div class="absolute inset-0">
        <div class="absolute top-20 left-10 w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div class="absolute top-40 right-20 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style="animation-delay: 2s"></div>
        <div class="absolute -bottom-20 left-1/2 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style="animation-delay: 4s"></div>
      </div>
      <div class="container mx-auto max-w-6xl relative z-10">
        <div class="text-center mb-12">
          <div class="inline-block glass-dark px-6 py-3 rounded-full mb-6 backdrop-blur-xl border border-white/30">
            <span class="text-white font-bold text-sm">✨ Discover African Wonders</span>
          </div>
          <h1 class="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Experience the Soul of <span class="text-cyan-200">Africa</span>
          </h1>
          <p class="text-lg md:text-xl text-white text-opacity-95 max-w-3xl mx-auto font-light leading-relaxed">
            Embark on unforgettable journeys through Rwanda's vibrant landscapes and rich culture
          </p>
        </div>

        <!-- Search Box -->
        <Card padding="lg" class="max-w-5xl mx-auto shadow-african backdrop-blur-xl border-2 border-white/40">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
            <!-- Destination -->
            <div class="md:col-span-2">
              <label class="block text-sm font-bold text-text-brand-600 mb-3">Where to?</label>
              <div class="relative">
                <input 
                  type="text" 
                  placeholder="Kigali, Akagera, Volcanoes..."
                  v-model="searchQuery.destination"
                  class="w-full px-5 py-4 pl-12 glass border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:glass-strong font-medium text-base backdrop-blur-xl transition-all"
                />
                <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>

            <!-- Dates -->
            <div>
              <label class="block text-sm font-bold text-text-brand-600 mb-3">When?</label>
              <input 
                type="date" 
                v-model="searchQuery.date"
                class="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:glass-strong font-medium text-base backdrop-blur-xl transition-all"
              />
            </div>

            <!-- Type -->
            <div>
              <label class="block text-sm font-bold text-text-brand-600 mb-3">Type</label>
              <select 
                v-model="searchQuery.type"
                class="w-full px-5 py-4 glass border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:glass-strong font-medium text-base backdrop-blur-xl transition-all"
              >
                <option value="all">All</option>
                <option value="stays">Stays</option>
                <option value="tours">Tours</option>
                <option value="transport">Transport</option>
              </select>
            </div>
          </div>

          <Button variant="primary" size="lg" full-width class="mt-4" @click="handleSearch">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            Search
          </Button>
        </Card>
      </div>
    </section>



    <!-- Recommended Stays -->
    <section class="container mx-auto px-4 lg:px-8 mt-20 mb-16">
      <div class="flex items-center justify-between mb-12">
        <div>
          <div class="inline-flex items-center space-x-2 glass-primary px-4 py-2 rounded-full backdrop-blur-xl mb-3">
            <span class="text-2xl">🌟</span>
            <span class="text-brand-600 font-bold text-sm">Featured</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-text-brand-600 mb-2">Recommended <span class="text-brand-600">Stays</span></h2>
          <p class="text-text-secondary text-base">Handpicked accommodations with African warmth</p>
        </div>
        <Button variant="text" @click="router.push('/accommodations')">
          View All
          <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          v-for="stay in recommendedStays" 
          :key="stay.id"
          hover 
          clickable 
          padding="none"
          @click="router.push(`/accommodation/${stay.id}`)"
          class="overflow-hidden group"
        >
          <div class="relative h-56 overflow-hidden">
            <img loading="lazy" :src="stay.image" :alt="stay.name" class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div class="absolute top-3 right-3 glass-strong text-text-brand-600 px-3 py-2 rounded-2xl text-sm font-bold backdrop-blur-xl border border-white/40 flex items-center">
              <span class="text-brand-600 mr-1">⭐</span>
              {{ stay.rating }}
            </div>
            <div v-if="stay.eco" class="absolute top-3 left-3 bg-gradient-to-r from-success to-accent-green text-white px-4 py-2 rounded-2xl text-xs font-bold flex items-center shadow-african">
              <svg class="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm0-10a4 4 0 100 8 4 4 0 000-8z"/>
              </svg>
              Eco-Friendly
            </div>
          </div>
          <div class="p-5">
            <h3 class="font-bold text-lg mb-2 text-text-brand-600">{{ stay.name }}</h3>
            <p class="text-text-secondary text-sm mb-4 flex items-center">
              <svg class="w-4 h-4 mr-2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {{ stay.location }}
            </p>
            <div class="flex items-baseline justify-between pt-4 border-t border-white/30">
              <div class="flex items-baseline">
                <span class="text-2xl font-bold bg-gradient-to-r from-brand-500 to-secondary bg-clip-text text-transparent">${{ stay.price }}</span>
                <span class="text-text-muted text-sm ml-2">/night</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <!-- Featured Tours -->
    <section class="container mx-auto px-4 lg:px-8 mb-16">
      <div class="flex items-center justify-between mb-12">
        <div>
          <div class="inline-flex items-center space-x-2 glass-primary px-4 py-2 rounded-full backdrop-blur-xl mb-3">
            <span class="text-2xl">🌍</span>
            <span class="text-accent-green font-bold text-sm">Experiences</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-text-brand-600 mb-2">Featured <span class="text-accent-green">Tours</span></h2>
          <p class="text-text-secondary text-base">Authentic African adventures await</p>
        </div>
        <Button variant="text" @click="router.push('/tours')">
          View All
          <svg class="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card 
          v-for="tour in featuredTours" 
          :key="tour.id"
          hover 
          clickable 
          padding="none"
          @click="router.push(`/tour/${tour.id}`)"
          class="overflow-hidden group"
        >
          <div class="relative h-64 overflow-hidden rounded-t-card">
            <img loading="lazy" :src="tour.image" :alt="tour.name" class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div class="absolute top-4 left-4">
              <span class="inline-block px-4 py-2 glass-dark text-white rounded-2xl text-sm font-bold backdrop-blur-xl border border-white/30">{{ tour.category }}</span>
            </div>
            <div class="absolute bottom-4 left-4 right-4 text-white">
              <h3 class="font-bold text-2xl mb-2 drop-shadow-lg">{{ tour.name }}</h3>
            </div>
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center glass-primary px-3 py-2 rounded-xl backdrop-blur-xl">
                <svg class="w-5 h-5 mr-2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span class="text-text-brand-600 text-sm font-bold">{{ tour.duration }}</span>
              </div>
              <div class="flex items-baseline">
                <span class="text-3xl font-bold bg-gradient-to-r from-brand-500 to-secondary bg-clip-text text-transparent">${{ tour.price }}</span>
              </div>
            </div>
            <p class="text-text-secondary leading-relaxed">{{ tour.description }}</p>
          </div>
        </Card>
      </div>
    </section>

    <!-- Seasonal Highlights -->
    <section class="container mx-auto px-4 lg:px-8 mb-16">
      <div class="relative overflow-hidden rounded-3xl p-12 md:p-16 text-white african-pattern">
        <div class="absolute inset-0 bg-gradient-to-r from-brand-500 via-secondary to-accent-red"></div>
        <div class="absolute inset-0">
          <div class="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div class="absolute bottom-0 left-0 w-96 h-96 bg-accent-purple rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        </div>
        <div class="relative z-10 max-w-3xl">
          <div class="inline-flex items-center space-x-2 glass-dark px-5 py-3 rounded-full backdrop-blur-xl mb-6 border border-white/30">
            <span class="text-2xl">🎉</span>
            <span class="font-bold">Limited Time Offer</span>
          </div>
          <h2 class="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">Discover Rwanda's Hidden Gems</h2>
          <p class="text-lg mb-8 text-white/95 leading-relaxed">
            Experience authentic African culture with exclusive seasonal packages. Book now and save up to 30% on accommodations and guided tours.
          </p>
          <Button variant="secondary" size="lg">
            Explore Deals
          </Button>
        </div>
      </div>
    </section>

    <!-- AI Concierge Promo -->
    <section class="container mx-auto px-4 lg:px-8 mb-16">
      <Card padding="lg" class="border-2 border-white/40 backdrop-blur-xl">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div class="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-purple to-accent-green px-5 py-3 rounded-full mb-6 shadow-african">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
              <span class="text-white font-bold">AI Powered</span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-text-brand-600 mb-4">Your Personal <span class="text-brand-600">Travel Concierge</span></h2>
            <p class="text-text-secondary text-base mb-8 leading-relaxed">
              Experience intelligent travel planning with AI that understands African destinations. Get personalized recommendations and instant support.
            </p>
            <Button variant="primary" size="lg">
              Try AI Concierge
              <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Button>
          </div>
          <div class="hidden md:block">
            <div class="glass-strong border-2 border-white/40 rounded-3xl p-8 space-y-5 backdrop-blur-xl shadow-african">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-secondary to-earth-clay flex items-center justify-center flex-shrink-0 shadow-african">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="glass border border-white/40 rounded-2xl rounded-tl-none p-4 backdrop-blur-xl">
                    <p class="text-sm font-medium text-text-brand-600">I want to explore Rwanda's culture and wildlife for 5 days</p>
                  </div>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-secondary flex items-center justify-center flex-shrink-0 shadow-african">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                  </svg>
                </div>
                <div class="flex-1">
                  <div class="bg-gradient-to-r from-brand-500 to-secondary text-white rounded-2xl rounded-tl-none p-4 shadow-african">
                    <p class="text-sm font-medium">Perfect! I've crafted an amazing itinerary: Gorilla trekking in Volcanoes NP, cultural tour in Kigali, safari in Akagera, and traditional dance experiences. All bookings ready!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>

    <!-- Share Your Stories Section -->
    <section class="container mx-auto px-4 lg:px-8 mb-16">
      <div class="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 md:p-12">
        <div class="text-center mb-10">
          <div class="inline-flex items-center space-x-2 glass-primary px-4 py-2 rounded-full backdrop-blur-xl mb-3">
            <span class="text-2xl">📸</span>
            <span class="text-teal-600 font-bold text-sm">Community</span>
          </div>
          <h2 class="text-2xl md:text-3xl font-bold text-text-brand-600 mb-2">Share Your <span class="text-teal-600">Travel Stories</span></h2>
          <p class="text-text-secondary text-base max-w-2xl mx-auto">Join our community of travelers and share your amazing experiences across Africa</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Story Card 1 -->
          <Card hover class="overflow-hidden">
            <div class="relative h-48 overflow-hidden">
              <img loading="lazy" src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400" alt="Travel Story" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-3 left-3 right-3">
                <p class="text-white font-semibold text-sm">Amazing gorilla trekking in Volcanoes National Park!</p>
                <p class="text-white/80 text-xs mt-1">- Sarah M.</p>
              </div>
            </div>
          </Card>

          <!-- Story Card 2 -->
          <Card hover class="overflow-hidden">
            <div class="relative h-48 overflow-hidden">
              <img loading="lazy" src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400" alt="Travel Story" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-3 left-3 right-3">
                <p class="text-white font-semibold text-sm">Unforgettable safari experience in Akagera</p>
                <p class="text-white/80 text-xs mt-1">- John D.</p>
              </div>
            </div>
          </Card>

          <!-- Story Card 3 -->
          <Card hover class="overflow-hidden">
            <div class="relative h-48 overflow-hidden">
              <img loading="lazy" src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400" alt="Travel Story" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div class="absolute bottom-3 left-3 right-3">
                <p class="text-white font-semibold text-sm">Beautiful sunset at Lake Kivu</p>
                <p class="text-white/80 text-xs mt-1">- Emma L.</p>
              </div>
            </div>
          </Card>
        </div>

        <div class="text-center">
          <Button variant="primary" size="lg" class="bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Share Your Story
          </Button>
        </div>
      </div>
    </section>

    <!-- Features Overview -->
    <section class="container mx-auto px-4 lg:px-8 mb-16">
      <div class="text-center mb-12">
        <h2 class="text-2xl md:text-3xl font-bold text-text-brand-600 mb-2">Why Choose <span class="text-teal-600">Merry360</span></h2>
        <p class="text-text-secondary text-base">Everything you need for your African adventure</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
          </div>
          <h3 class="font-bold text-lg mb-2 text-text-brand-600">Premium Stays</h3>
          <p class="text-text-secondary text-sm">Handpicked accommodations for comfort</p>
        </Card>

        <Card class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="font-bold text-lg mb-2 text-text-brand-600">Guided Tours</h3>
          <p class="text-text-secondary text-sm">Expert guides for authentic experiences</p>
        </Card>

        <Card class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
          </div>
          <h3 class="font-bold text-lg mb-2 text-text-brand-600">Easy Transport</h3>
          <p class="text-text-secondary text-sm">Reliable transportation services</p>
        </Card>

        <Card class="text-center">
          <div class="w-16 h-16 bg-gradient-to-br from-cyan-600 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="font-bold text-lg mb-2 text-text-brand-600">Best Prices</h3>
          <p class="text-text-secondary text-sm">Competitive rates with great value</p>
        </Card>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MainLayout from '../../components/layout/MainLayout.vue'
import Card from '../../components/common/Card.vue'
import Button from '../../components/common/Button.vue'

const router = useRouter()

const searchQuery = ref({
  destination: '',
  date: '',
  type: 'all'
})

const recommendedStays = ref([
  {
    id: 1,
    name: 'Kigali Serena Hotel',
    location: 'Kigali, Rwanda',
    price: 150,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
    eco: true
  },
  {
    id: 2,
    name: 'Lake Kivu Resort',
    location: 'Gisenyi, Rwanda',
    price: 120,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
    eco: false
  },
  {
    id: 3,
    name: 'Akagera Safari Lodge',
    location: 'Akagera National Park',
    price: 180,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400',
    eco: true
  },
  {
    id: 4,
    name: 'Volcanoes View Lodge',
    location: 'Musanze, Rwanda',
    price: 200,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400',
    eco: true
  }
])

const featuredTours = ref([
  {
    id: 1,
    name: 'Gorilla Trekking Experience',
    category: 'Adventure',
    duration: '1 Day',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600',
    description: 'Get up close with mountain gorillas in their natural habitat'
  },
  {
    id: 2,
    name: 'Kigali City Cultural Tour',
    category: 'Cultural',
    duration: '4 Hours',
    price: 50,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600',
    description: 'Explore the vibrant culture and history of Rwanda\'s capital'
  },
  {
    id: 3,
    name: 'Lake Kivu Island Hopping',
    category: 'Nature',
    duration: '1 Day',
    price: 80,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600',
    description: 'Discover the beautiful islands and beaches of Lake Kivu'
  }
])

const handleSearch = () => {
  if (searchQuery.value.type === 'stays' || searchQuery.value.type === 'all') {
    router.push('/accommodations')
  } else if (searchQuery.value.type === 'tours') {
    router.push('/tours')
  } else if (searchQuery.value.type === 'transport') {
    router.push('/transport')
  }
}
</script>
