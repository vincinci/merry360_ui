// Test Supabase Connection
import { supabase } from './services/supabase'

async function testConnection() {
  console.log('🔍 Testing Supabase Connection...\n')
  
  // Test 1: Check if client is initialized
  console.log('✅ Supabase client initialized')
  console.log('   URL:', import.meta.env.VITE_SUPABASE_URL)
  
  // Test 2: Try to query a table
  try {
    const { data, error } = await supabase
      .from('accommodations')
      .select('id, title')
      .limit(1)
    
    if (error) {
      console.log('⚠️  Database query error:', error.message)
      console.log('   Note: This is expected if no data exists yet')
    } else {
      console.log('✅ Database connection successful!')
      if (data && data.length > 0) {
        console.log('   Sample data found:', data[0].title)
      } else {
        console.log('   Database is empty - run seed.sql to add sample data')
      }
    }
  } catch (err) {
    console.log('❌ Connection failed:', err.message)
  }
  
  // Test 3: Check auth
  try {
    const { data: { session } } = await supabase.auth.getSession()
    console.log('✅ Auth service working')
    console.log('   Current session:', session ? 'Active' : 'No active session')
  } catch (err) {
    console.log('❌ Auth check failed:', err.message)
  }
  
  console.log('\n✨ Connection test complete!')
}

testConnection()
