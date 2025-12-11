// Test OpenAI Integration
import OpenAI from 'openai'
import 'dotenv/config'

const apiKey = process.env.VITE_OPENAI_API_KEY

console.log('🤖 Testing OpenAI API Connection...\n')

async function testOpenAI() {
  try {
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true })
    
    console.log('📡 Sending test message to GPT-4...')
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are Amani, a friendly AI travel advisor for Rwanda. Keep responses concise and helpful.'
        },
        {
          role: 'user',
          content: 'Tell me about gorilla trekking in Rwanda in 2 sentences.'
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    })
    
    const aiResponse = response.choices[0].message.content
    
    console.log('✅ OpenAI API is working!\n')
    console.log('🤖 AI Response:')
    console.log(`   "${aiResponse}"\n`)
    console.log('💡 Model:', response.model)
    console.log('📊 Tokens used:', response.usage.total_tokens)
    console.log('\n✨ Your AI Concierge is now powered by GPT-4!')
    
  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.status === 401) {
      console.log('\n⚠️  API key may be invalid or expired')
    }
  }
}

testOpenAI()
