/**
 * OpenAI Service
 * AI Concierge powered by GPT-4
 */

import OpenAI from 'openai'

const apiKey = import.meta.env.VITE_OPENAI_API_KEY
const model = import.meta.env.VITE_OPENAI_MODEL || 'gpt-4-turbo'

// Initialize OpenAI client
let openai = null

if (apiKey) {
  openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
  })
}

/**
 * AI Concierge System Prompt
 */
const SYSTEM_PROMPT = `You are Merry360 AI Concierge, a helpful and friendly travel assistant for Rwanda. 
Your role is to help travelers:

1. Find accommodations (hotels, resorts, lodges, apartments)
2. Discover tours and activities (gorilla trekking, safaris, cultural tours, hiking)
3. Book transport services (airport transfers, car rentals, shuttles)
4. Get travel information about Rwanda
5. Provide recommendations based on budget and preferences

Key Information:
- Rwanda's capital: Kigali
- Popular destinations: Volcanoes National Park (gorilla trekking), Akagera National Park (safari), Lake Kivu (beaches), Nyungwe Forest (canopy walk)
- Currency: Rwandan Franc (RWF), USD also accepted
- Language: Kinyarwanda, French, English
- Climate: Pleasant year-round, rainy seasons March-May and October-December

Be conversational, helpful, and enthusiastic about Rwanda. Keep responses concise but informative.
If asked about specific properties or tours, provide details about types, prices, and availability.
Always encourage users to book through the Merry360 platform.`

/**
 * OpenAI Chat Service
 */
export const openAIService = {
  /**
   * Check if OpenAI is configured
   */
  isConfigured() {
    return !!openai
  },

  /**
   * Send message to AI Concierge
   */
  async sendMessage(message, conversationHistory = []) {
    if (!openai) {
      throw new Error('OpenAI is not configured. Please add VITE_OPENAI_API_KEY to your .env file.')
    }

    try {
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        })),
        { role: 'user', content: message }
      ]

      const completion = await openai.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 500,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })

      return {
        message: completion.choices[0].message.content,
        usage: completion.usage
      }
    } catch (error) {
      console.error('OpenAI API Error:', error)
      throw error
    }
  },

  /**
   * Get AI suggestions for accommodations
   */
  async getSuggestions(userPreferences) {
    if (!openai) {
      return this.getFallbackSuggestions(userPreferences)
    }

    try {
      const prompt = `Based on these preferences: ${JSON.stringify(userPreferences)}, 
      suggest 3 accommodations in Rwanda with brief descriptions. Format as JSON array with: name, type, location, priceRange, reason.`

      const completion = await openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        temperature: 0.8,
        max_tokens: 400
      })

      return JSON.parse(completion.choices[0].message.content)
    } catch (error) {
      console.error('Error getting suggestions:', error)
      return this.getFallbackSuggestions(userPreferences)
    }
  },

  /**
   * Fallback suggestions when OpenAI is not available
   */
  getFallbackSuggestions(preferences) {
    return [
      {
        name: 'Kigali Serena Hotel',
        type: 'Luxury Hotel',
        location: 'Kigali',
        priceRange: '$200-300/night',
        reason: 'Perfect for business and leisure with world-class amenities'
      },
      {
        name: 'Lake Kivu Resort',
        type: 'Beach Resort',
        location: 'Rubavu',
        priceRange: '$150-250/night',
        reason: 'Beautiful lakeside location with water activities'
      },
      {
        name: 'Volcanoes Lodge',
        type: 'Eco-Lodge',
        location: 'Musanze',
        priceRange: '$300-400/night',
        reason: 'Gateway to gorilla trekking adventures'
      }
    ]
  },

  /**
   * Get contextual help based on current page
   */
  async getContextualHelp(pageContext) {
    if (!openai) {
      return this.getFallbackHelp(pageContext)
    }

    try {
      const prompt = `User is on the ${pageContext.page} page. ${pageContext.details}. 
      Provide a brief helpful tip or suggestion (max 50 words).`

      const completion = await openai.chat.completions.create({
        model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 100
      })

      return completion.choices[0].message.content
    } catch (error) {
      console.error('Error getting contextual help:', error)
      return this.getFallbackHelp(pageContext)
    }
  },

  /**
   * Fallback help messages
   */
  getFallbackHelp(pageContext) {
    const helpMessages = {
      accommodations: 'Browse our handpicked selection of hotels, resorts, and lodges across Rwanda. Use filters to find your perfect stay!',
      tours: 'Discover amazing experiences from gorilla trekking to cultural tours. Book your adventure today!',
      transport: 'Need a ride? We offer airport transfers, car rentals, and more. Book reliable transport for your journey.',
      checkout: 'Almost there! Complete your booking securely. We accept multiple payment methods.',
      default: 'Welcome to Merry360! I\'m here to help you plan your perfect Rwanda adventure. Ask me anything!'
    }

    return helpMessages[pageContext.page] || helpMessages.default
  }
}

export default openAIService
