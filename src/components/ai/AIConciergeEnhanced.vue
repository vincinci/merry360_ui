<template>
  <!-- Floating Button -->
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Minimized State - Chat Button -->
    <transition
      enter-active-class="transition-all duration-300"
      leave-active-class="transition-all duration-300"
      enter-from-class="opacity-0 scale-50"
      leave-to-class="opacity-0 scale-50"
    >
      <button
        v-if="!isOpen"
        @click="openChat"
        class="group relative bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-full p-4 shadow-2xl hover:shadow-brand-500/50 transition-all duration-300 hover:scale-110"
      >
        <!-- Pulse Animation -->
        <span class="absolute inset-0 rounded-full bg-brand-500 animate-ping opacity-75"></span>
        
        <!-- Icon -->
        <svg class="w-7 h-7 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
        
        <!-- Tooltip -->
        <div class="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div class="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            AI Trip Advisor
            <div class="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </button>
    </transition>

    <!-- Expanded State - Chat Window -->
    <transition
      enter-active-class="transition-all duration-300"
      leave-active-class="transition-all duration-300"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-if="isOpen"
        class="bg-white rounded-3xl shadow-2xl w-96 h-[600px] flex flex-col overflow-hidden border border-gray-200"
      >
        <!-- Header -->
        <div class="bg-gradient-to-r from-brand-500 to-brand-600 text-white p-4 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div class="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 class="font-bold text-lg">AI Trip Advisor</h3>
              <p class="text-white/80 text-xs">Here to help plan your journey</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button @click="minimizeChat" class="text-white hover:bg-white/20 p-2 rounded-full transition-colors" title="Minimize">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Messages Area -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          <!-- Welcome Message with Questions -->
          <div v-if="messages.length === 0" class="space-y-4">
            <!-- AI Avatar + Greeting -->
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 flex-1">
                <p class="text-sm text-gray-900 mb-3">👋 Hello! I'm your AI Trip Advisor. I can help you with:</p>
                <ul class="text-sm text-gray-700 space-y-1.5 mb-3">
                  <li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Finding accommodations</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Planning tours & activities</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Arranging transportation</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>Travel tips & recommendations</span>
                  </li>
                </ul>
                <p class="text-sm font-semibold text-gray-900">What brings you to Rwanda?</p>
              </div>
            </div>

            <!-- Quick Action Buttons -->
            <div class="space-y-2">
              <button 
                v-for="option in quickOptions" 
                :key="option.id"
                @click="selectOption(option)"
                class="w-full bg-white hover:bg-brand-50 border-2 border-gray-200 hover:border-brand-500 rounded-xl p-3 text-left transition-all group"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-brand-50 group-hover:bg-brand-500 rounded-lg flex items-center justify-center transition-colors">
                    <span class="text-xl group-hover:scale-110 transition-transform">{{ option.icon }}</span>
                  </div>
                  <div class="flex-1">
                    <p class="font-semibold text-sm text-gray-900">{{ option.label }}</p>
                    <p class="text-xs text-gray-500">{{ option.description }}</p>
                  </div>
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>

          <!-- Conversation Messages -->
          <div v-for="(message, index) in messages" :key="index" class="space-y-3">
            <!-- User Message -->
            <div v-if="message.type === 'user'" class="flex justify-end">
              <div class="bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] shadow-sm">
                <p class="text-sm">{{ message.text }}</p>
              </div>
            </div>

            <!-- AI Message with Options -->
            <div v-else class="flex items-start gap-3">
              <div class="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <div class="flex-1 space-y-2">
                <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
                  <p class="text-sm text-gray-900">{{ message.text }}</p>
                </div>
                
                <!-- Follow-up Options -->
                <div v-if="message.options && message.options.length > 0" class="space-y-1.5 pl-2">
                  <button
                    v-for="option in message.options"
                    :key="option"
                    @click="sendMessage(option)"
                    class="block w-full text-left bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-lg px-3 py-2 text-sm text-brand-700 hover:text-brand-900 transition-colors"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Typing Indicator -->
          <div v-if="isTyping" class="flex items-start gap-3">
            <div class="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg class="w-4 h-4 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <div class="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100">
              <div class="flex gap-1">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input Area -->
        <div class="p-4 bg-white border-t border-gray-200">
          <div class="flex gap-2">
            <input 
              v-model="inputMessage"
              @keypress.enter="sendUserMessage"
              type="text" 
              placeholder="Type your message..."
              class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent text-sm"
            />
            <button 
              @click="sendUserMessage"
              :disabled="!inputMessage.trim() || isTyping"
              class="bg-brand-500 hover:bg-brand-600 disabled:bg-gray-300 text-white p-3 rounded-full transition-all hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-sm"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

const isOpen = ref(false)
const messages = ref([])
const inputMessage = ref('')
const isTyping = ref(false)
const messagesContainer = ref(null)

// Load persisted state
onMounted(() => {
  const savedState = localStorage.getItem('ai_concierge_state')
  if (savedState) {
    const { wasOpen, savedMessages } = JSON.parse(savedState)
    if (wasOpen) {
      isOpen.value = true
    }
    if (savedMessages && savedMessages.length > 0) {
      messages.value = savedMessages
    }
  }
})

const quickOptions = [
  {
    id: 'accommodation',
    icon: '🏨',
    label: 'Find Accommodation',
    description: 'Hotels, lodges & rentals'
  },
  {
    id: 'tours',
    icon: '🦍',
    label: 'Book a Tour',
    description: 'Gorilla trekking, safaris & more'
  },
  {
    id: 'transport',
    icon: '🚗',
    label: 'Arrange Transport',
    description: 'Car rentals & transfers'
  },
  {
    id: 'itinerary',
    icon: '📋',
    label: 'Plan My Trip',
    description: 'Custom itinerary suggestions'
  }
]

const openChat = () => {
  isOpen.value = true
  saveState()
}

const minimizeChat = () => {
  isOpen.value = false
  saveState()
}

const saveState = () => {
  localStorage.setItem('ai_concierge_state', JSON.stringify({
    wasOpen: isOpen.value,
    savedMessages: messages.value
  }))
}

const selectOption = (option) => {
  sendMessage(option.label)
}

const sendMessage = (text) => {
  messages.value.push({
    type: 'user',
    text: text
  })
  
  scrollToBottom()
  
  // Simulate AI response
  setTimeout(() => {
    generateResponse(text)
  }, 500)
  
  saveState()
}

const sendUserMessage = () => {
  if (!inputMessage.value.trim() || isTyping.value) return
  
  const text = inputMessage.value.trim()
  inputMessage.value = ''
  sendMessage(text)
}

const generateResponse = (userMessage) => {
  isTyping.value = true
  
  setTimeout(() => {
    let responseText = ''
    let options = []
    
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('accommodation') || lowerMessage.includes('hotel') || lowerMessage.includes('find accommodation')) {
      responseText = "Great! I can help you find the perfect accommodation. What's your budget range, and do you prefer hotels, lodges, or vacation rentals?"
      options = ['Budget ($50-$100/night)', 'Mid-range ($100-$200/night)', 'Luxury ($200+/night)']
    } else if (lowerMessage.includes('tour') || lowerMessage.includes('gorilla') || lowerMessage.includes('book a tour')) {
      responseText = "Excellent choice! Rwanda offers amazing tours. Are you interested in gorilla trekking, city tours, or safari adventures?"
      options = ['Gorilla Trekking', 'Kigali City Tour', 'Akagera Safari', 'Lake Kivu Experience']
    } else if (lowerMessage.includes('transport') || lowerMessage.includes('car') || lowerMessage.includes('arrange transport')) {
      responseText = "I can help arrange your transportation. Would you like a car rental, private driver, or airport transfer?"
      options = ['Car Rental', 'Private Driver', 'Airport Transfer', 'Shuttle Service']
    } else if (lowerMessage.includes('plan') || lowerMessage.includes('itinerary') || lowerMessage.includes('plan my trip')) {
      responseText = "I'd love to help plan your trip! How many days will you be staying in Rwanda?"
      options = ['3-5 days', '5-7 days', '7-10 days', 'More than 10 days']
    } else if (lowerMessage.includes('budget') || lowerMessage.includes('$')) {
      responseText = "Perfect! I'll show you our best options in that price range. Would you like me to also suggest nearby restaurants and activities?"
      options = ['Yes, show me everything', 'Just accommodations', 'View on map']
    } else {
      responseText = "I'd be happy to help! Could you tell me more about what you're looking for? I can assist with accommodations, tours, transportation, or planning your entire itinerary."
      options = ['Find Hotels', 'Browse Tours', 'Get Transport', 'Plan Full Trip']
    }
    
    messages.value.push({
      type: 'ai',
      text: responseText,
      options: options
    })
    
    isTyping.value = false
    scrollToBottom()
    saveState()
  }, 1000)
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>
