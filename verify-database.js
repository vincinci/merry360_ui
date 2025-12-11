#!/usr/bin/env node

/**
 * Complete Database Verification Script
 * Tests all Supabase connections and data
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aqrzvlwgkjwaqthsjxpt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcnp2bHdna2p3YXF0aHNqeHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NzAwMDksImV4cCI6MjA4MTA0NjAwOX0.K_8LajqS6qNjMnM3FMVICXyhJG2c8yecNt-glByuhMs'

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('🔍 COMPLETE DATABASE VERIFICATION\n')
console.log('=' .repeat(60))

async function verifyDatabase() {
  let totalTests = 0
  let passedTests = 0

  // Test 1: Connection
  console.log('\n📡 Test 1: Database Connection')
  try {
    const { error } = await supabase.from('accommodations').select('count').limit(1)
    if (!error) {
      console.log('   ✅ Connection successful')
      passedTests++
    } else {
      console.log('   ❌ Connection failed:', error.message)
    }
    totalTests++
  } catch (err) {
    console.log('   ❌ Connection error:', err.message)
    totalTests++
  }

  // Test 2: Accommodations
  console.log('\n🏨 Test 2: Accommodations Table')
  try {
    const { data, error, count } = await supabase
      .from('accommodations')
      .select('*', { count: 'exact' })
    
    if (!error && data) {
      console.log(`   ✅ Found ${count} accommodations`)
      console.log(`   📍 Sample: ${data[0]?.title || 'N/A'}`)
      console.log(`   💰 Price range: $${Math.min(...data.map(a => a.price_per_night))} - $${Math.max(...data.map(a => a.price_per_night))}`)
      passedTests++
    } else {
      console.log('   ❌ Query failed:', error?.message)
    }
    totalTests++
  } catch (err) {
    console.log('   ❌ Error:', err.message)
    totalTests++
  }

  // Test 3: Tours
  console.log('\n🦍 Test 3: Tours Table')
  try {
    const { data, error, count } = await supabase
      .from('tours')
      .select('*', { count: 'exact' })
    
    if (!error && data) {
      console.log(`   ✅ Found ${count} tours`)
      console.log(`   🎯 Sample: ${data[0]?.title || 'N/A'}`)
      console.log(`   💰 Price range: $${Math.min(...data.map(t => t.price))} - $${Math.max(...data.map(t => t.price))}`)
      passedTests++
    } else {
      console.log('   ❌ Query failed:', error?.message)
    }
    totalTests++
  } catch (err) {
    console.log('   ❌ Error:', err.message)
    totalTests++
  }

  // Test 4: Transport
  console.log('\n🚗 Test 4: Transport Options Table')
  try {
    const { data, error, count } = await supabase
      .from('transport_options')
      .select('*', { count: 'exact' })
    
    if (!error && data) {
      console.log(`   ✅ Found ${count} transport options`)
      console.log(`   🚙 Sample: ${data[0]?.title || 'N/A'}`)
      console.log(`   💰 Price range: $${Math.min(...data.map(t => t.price))} - $${Math.max(...data.map(t => t.price))}`)
      passedTests++
    } else {
      console.log('   ❌ Query failed:', error?.message)
    }
    totalTests++
  } catch (err) {
    console.log('   ❌ Error:', err.message)
    totalTests++
  }

  // Test 5: Filters
  console.log('\n🔍 Test 5: Filter Queries')
  try {
    const { data, error } = await supabase
      .from('accommodations')
      .select('*')
      .eq('city', 'Kigali')
      .lte('price_per_night', 100)
    
    if (!error) {
      console.log(`   ✅ Filter working: Found ${data.length} budget accommodations in Kigali`)
      passedTests++
    } else {
      console.log('   ❌ Filter failed:', error.message)
    }
    totalTests++
  } catch (err) {
    console.log('   ❌ Error:', err.message)
    totalTests++
  }

  // Test 6: Eco-friendly filter
  console.log('\n🌿 Test 6: Eco-friendly Filter')
  try {
    const { data, error } = await supabase
      .from('accommodations')
      .select('*')
      .eq('is_eco_friendly', true)
    
    if (!error) {
      console.log(`   ✅ Found ${data.length} eco-friendly accommodations`)
      passedTests++
    } else {
      console.log('   ❌ Filter failed:', error.message)
    }
    totalTests++
  } catch (err) {
    console.log('   ❌ Error:', err.message)
    totalTests++
  }

  // Test 7: Auth service
  console.log('\n🔐 Test 7: Authentication Service')
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    if (!error) {
      console.log(`   ✅ Auth service working`)
      console.log(`   👤 Current session: ${session ? 'Active' : 'No active session'}`)
      passedTests++
    } else {
      console.log('   ❌ Auth check failed:', error.message)
    }
    totalTests++
  } catch (err) {
    console.log('   ❌ Error:', err.message)
    totalTests++
  }

  // Test 8: Complex query with sorting
  console.log('\n⭐ Test 8: Sorted Query (Top Rated)')
  try {
    const { data, error } = await supabase
      .from('accommodations')
      .select('title, rating, review_count')
      .order('rating', { ascending: false })
      .limit(3)
    
    if (!error && data) {
      console.log('   ✅ Top 3 rated accommodations:')
      data.forEach((acc, i) => {
        console.log(`      ${i + 1}. ${acc.title} - ${acc.rating}⭐ (${acc.review_count} reviews)`)
      })
      passedTests++
    } else {
      console.log('   ❌ Query failed:', error?.message)
    }
    totalTests++
  } catch (err) {
    console.log('   ❌ Error:', err.message)
    totalTests++
  }

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('\n📊 VERIFICATION SUMMARY')
  console.log(`   Tests Passed: ${passedTests}/${totalTests}`)
  console.log(`   Success Rate: ${((passedTests/totalTests) * 100).toFixed(1)}%`)
  
  if (passedTests === totalTests) {
    console.log('\n🎉 ALL TESTS PASSED! Database is fully operational.')
  } else {
    console.log(`\n⚠️  ${totalTests - passedTests} test(s) failed. Please review the errors above.`)
  }

  console.log('\n✨ Your Merry_360 Travel Platform is ready!')
  console.log('   🌐 Start the app: npm run dev')
  console.log('   📱 View at: http://localhost:5174')
  console.log('   🗄️  Database: https://supabase.com/dashboard/project/aqrzvlwgkjwaqthsjxpt')
  console.log('')
}

verifyDatabase().catch(console.error)
