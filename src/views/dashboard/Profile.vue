<template>
  <MainLayout>
    <div class="container mx-auto px-4 lg:px-8 py-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2">My Profile</h1>
        <p class="text-text-secondary">Manage your account information and preferences</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Profile Sidebar -->
        <div class="lg:col-span-1">
          <Card padding="lg">
            <!-- Avatar -->
            <div class="text-center mb-6">
              <div class="relative inline-block">
                <div class="w-32 h-32 bg-gradient-to-br from-brand-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span class="text-white text-4xl font-bold">{{ userInitials }}</span>
                </div>
                <button class="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </button>
              </div>
              <h2 class="text-xl font-bold mb-1">{{ userStore.user?.name || 'Guest User' }}</h2>
              <p class="text-text-secondary text-sm">{{ userStore.user?.email || 'guest@example.com' }}</p>
            </div>

            <!-- Membership -->
            <div class="p-4 bg-gradient-to-br from-brand-50 to-red-50 rounded-xl mb-4">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-text-secondary">Membership</span>
                <span class="px-2 py-1 bg-amber-500 text-white text-xs font-semibold rounded-full">
                  {{ userStore.loyaltyTier.toUpperCase() }}
                </span>
              </div>
              <div class="flex items-baseline gap-1">
                <span class="text-2xl font-bold text-brand-600">{{ userStore.loyaltyPoints }}</span>
                <span class="text-text-secondary text-sm">points</span>
              </div>
              <div class="mt-3">
                <div class="flex justify-between text-xs mb-1">
                  <span class="text-text-secondary">Next tier</span>
                  <span class="font-semibold">{{ userStore.nextTierPoints }} pts</span>
                </div>
                <div class="w-full bg-white rounded-full h-2">
                  <div class="bg-brand-500 rounded-full h-2 transition-all" :style="`width: ${loyaltyProgress}%`"></div>
                </div>
              </div>
            </div>

            <!-- Stats -->
            <div class="space-y-3">
              <div class="flex items-center justify-between py-2">
                <span class="text-sm text-text-secondary">Trips Completed</span>
                <span class="font-semibold">{{ userStore.pastBookings.length }}</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="text-sm text-text-secondary">Saved Items</span>
                <span class="font-semibold">{{ userStore.watchlistCount }}</span>
              </div>
              <div class="flex items-center justify-between py-2">
                <span class="text-sm text-text-secondary">Member Since</span>
                <span class="font-semibold">{{ memberSince }}</span>
              </div>
            </div>

            <!-- Logout Button -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <Button variant="outline" size="md" full-width @click="handleLogout" class="text-red-600 border-red-600 hover:bg-red-50">
                Logout
              </Button>
            </div>
          </Card>
        </div>

        <!-- Profile Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Personal Information -->
          <Card padding="lg">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold">Personal Information</h3>
              <Button variant="outline" size="sm" @click="editingPersonal = !editingPersonal">
                {{ editingPersonal ? 'Cancel' : 'Edit' }}
              </Button>
            </div>

            <form @submit.prevent="savePersonalInfo" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-text-brand-600 mb-2">First Name</label>
                  <Input
                    v-model="personalInfo.firstName"
                    :disabled="!editingPersonal"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-brand-600 mb-2">Last Name</label>
                  <Input
                    v-model="personalInfo.lastName"
                    :disabled="!editingPersonal"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-text-brand-600 mb-2">Email</label>
                <Input
                  v-model="personalInfo.email"
                  type="email"
                  :disabled="!editingPersonal"
                  placeholder="john.doe@example.com"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-text-brand-600 mb-2">Phone Number</label>
                <Input
                  v-model="personalInfo.phone"
                  type="tel"
                  :disabled="!editingPersonal"
                  placeholder="+250 7XX XXX XXX"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-text-brand-600 mb-2">Date of Birth</label>
                <Input
                  v-model="personalInfo.dateOfBirth"
                  type="date"
                  :disabled="!editingPersonal"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-text-brand-600 mb-2">Bio</label>
                <textarea
                  v-model="personalInfo.bio"
                  :disabled="!editingPersonal"
                  rows="3"
                  class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div v-if="editingPersonal" class="flex gap-3">
                <Button type="submit" variant="primary" size="md">
                  Save Changes
                </Button>
                <Button type="button" variant="outline" size="md" @click="editingPersonal = false">
                  Cancel
                </Button>
              </div>
            </form>
          </Card>

          <!-- Preferences -->
          <Card padding="lg">
            <h3 class="text-xl font-bold mb-6">Preferences</h3>

            <div class="space-y-6">
              <!-- Language -->
              <div>
                <label class="block text-sm font-medium text-text-brand-600 mb-2">Language</label>
                <select v-model="userStore.preferences.language" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option value="EN">English</option>
                  <option value="RW">Kinyarwanda</option>
                  <option value="FR">Français</option>
                </select>
              </div>

              <!-- Currency -->
              <div>
                <label class="block text-sm font-medium text-text-brand-600 mb-2">Currency</label>
                <select v-model="userStore.preferences.currency" class="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500">
                  <option value="RWF">RWF - Rwandan Franc</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                </select>
              </div>

              <!-- Notifications -->
              <div>
                <label class="block text-sm font-medium text-text-brand-600 mb-3">Notifications</label>
                <div class="space-y-3">
                  <label class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <span class="text-sm">Email Notifications</span>
                    <input type="checkbox" v-model="userStore.preferences.notifications.email" class="rounded border-gray-300 text-brand-600 focus:ring-brand-500">
                  </label>
                  <label class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <span class="text-sm">Push Notifications</span>
                    <input type="checkbox" v-model="userStore.preferences.notifications.push" class="rounded border-gray-300 text-brand-600 focus:ring-brand-500">
                  </label>
                  <label class="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <span class="text-sm">SMS Notifications</span>
                    <input type="checkbox" v-model="userStore.preferences.notifications.sms" class="rounded border-gray-300 text-brand-600 focus:ring-brand-500">
                  </label>
                </div>
              </div>

              <!-- Sustainable Travel -->
              <label class="flex items-center justify-between p-4 rounded-lg bg-green-50 border border-green-200 cursor-pointer">
                <div class="flex items-center gap-3">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <span class="text-sm font-semibold">Sustainable Travel Mode</span>
                    <p class="text-xs text-green-700">Show eco-friendly options first</p>
                  </div>
                </div>
                <input type="checkbox" v-model="userStore.preferences.sustainableTravel" class="rounded border-gray-300 text-green-600 focus:ring-green-500">
              </label>

              <Button variant="primary" size="md" @click="savePreferences">
                Save Preferences
              </Button>
            </div>
          </Card>

          <!-- Security -->
          <Card padding="lg">
            <h3 class="text-xl font-bold mb-6">Security</h3>

            <div class="space-y-4">
              <div class="p-4 border border-gray-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-semibold mb-1">Password</h4>
                    <p class="text-sm text-text-secondary">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline" size="sm" @click="showChangePassword = true">
                    Change
                  </Button>
                </div>
              </div>

              <div class="p-4 border border-gray-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-semibold mb-1">Two-Factor Authentication</h4>
                    <p class="text-sm text-text-secondary">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enable
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          <!-- Change Password Modal (simple version) -->
          <div v-if="showChangePassword" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
            <Card padding="lg" class="max-w-md w-full">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold">Change Password</h3>
                <button @click="showChangePassword = false" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <form @submit.prevent="changePassword" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-text-brand-600 mb-2">Current Password</label>
                  <Input
                    v-model="passwordForm.current"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-brand-600 mb-2">New Password</label>
                  <Input
                    v-model="passwordForm.new"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-text-brand-600 mb-2">Confirm New Password</label>
                  <Input
                    v-model="passwordForm.confirm"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                <div class="flex gap-3">
                  <Button type="submit" variant="primary" size="md" full-width>
                    Update Password
                  </Button>
                  <Button type="button" variant="outline" size="md" @click="showChangePassword = false">
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import MainLayout from '@/components/layout/MainLayout.vue'
import Card from '@/components/common/Card.vue'
import Input from '@/components/common/Input.vue'
import Button from '@/components/common/Button.vue'

const router = useRouter()
const userStore = useUserStore()

const editingPersonal = ref(false)
const showChangePassword = ref(false)

const personalInfo = ref({
  firstName: userStore.user?.name?.split(' ')[0] || '',
  lastName: userStore.user?.name?.split(' ')[1] || '',
  email: userStore.user?.email || '',
  phone: userStore.user?.phone || '',
  dateOfBirth: userStore.user?.dateOfBirth || '',
  bio: userStore.user?.bio || ''
})

const passwordForm = ref({
  current: '',
  new: '',
  confirm: ''
})

const userInitials = computed(() => {
  const name = userStore.user?.name || 'Guest User'
  const parts = name.split(' ')
  return parts.length > 1 
    ? `${parts[0][0]}${parts[1][0]}` 
    : name.substring(0, 2)
})

const loyaltyProgress = computed(() => {
  const tiers = { bronze: 1000, silver: 5000, gold: 15000, platinum: 50000 }
  const current = userStore.loyaltyPoints
  const currentTier = userStore.loyaltyTier
  const nextTier = Object.entries(tiers).find(([tier, points]) => current < points)
  
  if (!nextTier) return 100
  
  const tierEntries = Object.entries(tiers)
  const currentIndex = tierEntries.findIndex(([tier]) => tier === currentTier)
  const currentTierPoints = currentIndex > 0 ? tierEntries[currentIndex][1] : 0
  const nextTierPoints = nextTier[1]
  
  return Math.min(100, ((current - currentTierPoints) / (nextTierPoints - currentTierPoints)) * 100)
})

const memberSince = computed(() => {
  return 'Jan 2024'
})

const savePersonalInfo = () => {
  // Update user info
  userStore.user = {
    ...userStore.user,
    name: `${personalInfo.value.firstName} ${personalInfo.value.lastName}`,
    email: personalInfo.value.email,
    phone: personalInfo.value.phone,
    dateOfBirth: personalInfo.value.dateOfBirth,
    bio: personalInfo.value.bio
  }
  
  editingPersonal.value = false
  
  // Show success message (you can add a toast notification here)
  alert('Personal information updated successfully!')
}

const savePreferences = () => {
  // Preferences are already bound to the store
  alert('Preferences saved successfully!')
}

const changePassword = () => {
  if (passwordForm.value.new !== passwordForm.value.confirm) {
    alert('Passwords do not match!')
    return
  }
  
  if (passwordForm.value.new.length < 6) {
    alert('Password must be at least 6 characters!')
    return
  }
  
  // Simulate password change
  showChangePassword.value = false
  passwordForm.value = { current: '', new: '', confirm: '' }
  alert('Password changed successfully!')
}

const handleLogout = () => {
  if (confirm('Are you sure you want to logout?')) {
    userStore.logout()
    router.push('/login')
  }
}
</script>
