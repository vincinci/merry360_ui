<template>
  <div class="w-full max-w-4xl bg-white rounded-[20px] md:rounded-[35px] shadow-2xl p-3 md:p-2 relative" style="min-height: 70px;">
    <div class="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-0 px-2 md:px-6">
      <!-- Location -->
      <div class="md:border-r md:pr-5 pb-3 md:pb-0 border-b md:border-b-0 relative" style="border-color: #DDDDDD;">
        <label class="block text-xs font-bold mb-1.5" style="font-family: 'Montserrat', sans-serif; color: #484848; font-size: 12px;">Location</label>
        <input 
          type="text" 
          placeholder="Which city do you prefer?"
          v-model="location"
          class="w-full text-sm font-semibold focus:outline-none placeholder-gray-400"
          style="font-family: 'Montserrat', sans-serif; color: #484848; font-size: 14px;"
        />
      </div>

      <!-- Check In -->
      <div class="md:border-r md:px-5 pb-3 md:pb-0 border-b md:border-b-0 relative" style="border-color: #DDDDDD;">
        <label class="block text-xs font-bold mb-1.5" style="font-family: 'Montserrat', sans-serif; color: #484848; font-size: 12px;">Check In</label>
        <input 
          type="text" 
          :placeholder="checkInDate || 'dd/mm/yyyy'"
          :value="checkInDate"
          @click="openDatePicker('checkIn')"
          readonly
          class="w-full text-sm font-semibold focus:outline-none placeholder-gray-400 cursor-pointer"
          style="font-family: 'Montserrat', sans-serif; color: #484848; font-size: 14px;"
        />
        
        <!-- Check In Date Picker -->
        <transition name="fade">
          <div v-if="showDatePicker === 'checkIn'" v-click-outside="closeDatePicker" class="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50 w-80">
            <div class="flex items-center justify-between mb-4">
              <button @click="previousMonth" class="p-1 hover:bg-gray-100 rounded">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <div class="font-semibold">{{ currentMonthYear }}</div>
              <button @click="nextMonth" class="p-1 hover:bg-gray-100 rounded">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            
            <!-- Calendar Grid -->
            <div class="grid grid-cols-7 gap-1 text-center">
              <div v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day" class="text-xs font-semibold text-gray-600 py-2">
                {{ day }}
              </div>
              <div v-for="(date, index) in calendarDates" :key="index">
                <button
                  v-if="date"
                  @click="selectCheckInDate(date)"
                  :class="[
                    'w-full aspect-square rounded-lg text-sm hover:bg-brand-100 transition-colors',
                    isToday(date) ? 'font-bold' : '',
                    checkInDate === formatDate(date) ? 'bg-brand-500 text-white hover:bg-brand-600' : 'text-gray-700'
                  ]"
                >
                  {{ date.getDate() }}
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Check Out -->
      <div class="md:border-r md:px-5 pb-3 md:pb-0 border-b md:border-b-0 relative" style="border-color: #DDDDDD;">
        <label class="block text-xs font-bold mb-1.5" style="font-family: 'Montserrat', sans-serif; color: #484848; font-size: 12px;">Check Out</label>
        <input 
          type="text" 
          :placeholder="checkOutDate || 'dd/mm/yyyy'"
          :value="checkOutDate"
          @click="openDatePicker('checkOut')"
          readonly
          class="w-full text-sm font-semibold focus:outline-none placeholder-gray-400 cursor-pointer"
          style="font-family: 'Montserrat', sans-serif; color: #484848; font-size: 14px;"
        />
        
        <!-- Check Out Date Picker -->
        <transition name="fade">
          <div v-if="showDatePicker === 'checkOut'" v-click-outside="closeDatePicker" class="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50 w-80">
            <div class="flex items-center justify-between mb-4">
              <button @click="previousMonth" class="p-1 hover:bg-gray-100 rounded">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <div class="font-semibold">{{ currentMonthYear }}</div>
              <button @click="nextMonth" class="p-1 hover:bg-gray-100 rounded">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            
            <div class="grid grid-cols-7 gap-1 text-center">
              <div v-for="day in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="day" class="text-xs font-semibold text-gray-600 py-2">
                {{ day }}
              </div>
              <div v-for="(date, index) in calendarDates" :key="index">
                <button
                  v-if="date"
                  @click="selectCheckOutDate(date)"
                  :class="[
                    'w-full aspect-square rounded-lg text-sm hover:bg-brand-100 transition-colors',
                    isToday(date) ? 'font-bold' : '',
                    checkOutDate === formatDate(date) ? 'bg-brand-500 text-white hover:bg-brand-600' : 'text-gray-700',
                    isDateDisabled(date) ? 'opacity-30 cursor-not-allowed' : ''
                  ]"
                  :disabled="isDateDisabled(date)"
                >
                  {{ date.getDate() }}
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Guests -->
      <div class="md:pl-5 relative">
        <label class="block text-xs font-bold mb-1.5" style="font-family: 'Montserrat', sans-serif; color: #484848; font-size: 12px;">Guests</label>
        <input 
          type="text" 
          :placeholder="guestSummary"
          :value="guestSummary"
          @click="showGuestPicker = !showGuestPicker"
          readonly
          class="w-full text-sm font-semibold focus:outline-none placeholder-gray-400 cursor-pointer"
          style="font-family: 'Montserrat', sans-serif; color: #484848; font-size: 14px;"
        />
        
        <!-- Guest Picker Dropdown -->
        <transition name="fade">
          <div v-if="showGuestPicker" v-click-outside="closeGuestPicker" class="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 z-50 w-80">
            <!-- Adults -->
            <div class="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <div class="font-semibold text-sm">Adults</div>
                <div class="text-xs text-gray-500">Ages 13+</div>
              </div>
              <div class="flex items-center gap-3">
                <button 
                  @click="decrementGuests('adults')"
                  :disabled="guests.adults <= 1"
                  class="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-brand-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <span class="w-8 text-center font-semibold">{{ guests.adults }}</span>
                <button 
                  @click="incrementGuests('adults')"
                  class="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-brand-500 transition-colors flex items-center justify-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Children -->
            <div class="flex items-center justify-between py-3 border-b border-gray-200">
              <div>
                <div class="font-semibold text-sm">Children</div>
                <div class="text-xs text-gray-500">Ages 2-12</div>
              </div>
              <div class="flex items-center gap-3">
                <button 
                  @click="decrementGuests('children')"
                  :disabled="guests.children <= 0"
                  class="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-brand-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <span class="w-8 text-center font-semibold">{{ guests.children }}</span>
                <button 
                  @click="incrementGuests('children')"
                  class="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-brand-500 transition-colors flex items-center justify-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <!-- Infants -->
            <div class="flex items-center justify-between py-3">
              <div>
                <div class="font-semibold text-sm">Infants</div>
                <div class="text-xs text-gray-500">Under 2</div>
              </div>
              <div class="flex items-center gap-3">
                <button 
                  @click="decrementGuests('infants')"
                  :disabled="guests.infants <= 0"
                  class="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-brand-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
                  </svg>
                </button>
                <span class="w-8 text-center font-semibold">{{ guests.infants }}</span>
                <button 
                  @click="incrementGuests('infants')"
                  class="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-brand-500 transition-colors flex items-center justify-center"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- Search Button -->
    <button 
      @click="handleSearch"
      class="absolute right-2 top-1/2 -translate-y-1/2 w-[54px] h-[54px] rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200 shadow-lg"
      style="background: #FE4F4F;"
    >
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const location = ref('')
const checkInDate = ref('')
const checkOutDate = ref('')
const guests = ref({
  adults: 2,
  children: 0,
  infants: 0
})

const showDatePicker = ref(null)
const showGuestPicker = ref(false)
const currentMonth = ref(new Date())

const currentMonthYear = computed(() => {
  return currentMonth.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const guestSummary = computed(() => {
  const total = guests.value.adults + guests.value.children
  if (total === 0) return 'Add Guests'
  const parts = []
  if (total > 0) parts.push(`${total} guest${total > 1 ? 's' : ''}`)
  if (guests.value.infants > 0) parts.push(`${guests.value.infants} infant${guests.value.infants > 1 ? 's' : ''}`)
  return parts.join(', ')
})

const calendarDates = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startingDayOfWeek = firstDay.getDay()
  const daysInMonth = lastDay.getDate()
  
  const dates = []
  
  // Add empty slots for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    dates.push(null)
  }
  
  // Add all days in month
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(new Date(year, month, day))
  }
  
  return dates
})

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const isToday = (date) => {
  const today = new Date()
  return date.toDateString() === today.toDateString()
}

const isDateDisabled = (date) => {
  if (!checkInDate.value || showDatePicker.value !== 'checkOut') return false
  const [day, month, year] = checkInDate.value.split('/')
  const checkIn = new Date(year, month - 1, day)
  return date <= checkIn
}

const openDatePicker = (type) => {
  showDatePicker.value = type
  showGuestPicker.value = false
}

const closeDatePicker = () => {
  showDatePicker.value = null
}

const closeGuestPicker = () => {
  showGuestPicker.value = false
}

const selectCheckInDate = (date) => {
  checkInDate.value = formatDate(date)
  showDatePicker.value = null
}

const selectCheckOutDate = (date) => {
  checkOutDate.value = formatDate(date)
  showDatePicker.value = null
}

const previousMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1)
}

const incrementGuests = (type) => {
  guests.value[type]++
}

const decrementGuests = (type) => {
  if (guests.value[type] > 0) {
    if (type === 'adults' && guests.value[type] === 1) return
    guests.value[type]--
  }
}

const handleSearch = () => {
  console.log('Search:', {
    location: location.value,
    checkIn: checkInDate.value,
    checkOut: checkOutDate.value,
    guests: guests.value
  })
  // Emit search event or navigate
}

// Click outside directive
const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
