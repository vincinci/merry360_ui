import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Get environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://aqrzvlwgkjwaqthsjxpt.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxcnp2bHdna2p3YXF0aHNqeHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NzAwMDksImV4cCI6MjA4MTA0NjAwOX0.K_8LajqS6qNjMnM3FMVICXyhJG2c8yecNt-glByuhMs'

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('🚀 Starting database setup...\n')

async function setupDatabase() {
  try {
    // Test connection
    console.log('📡 Testing connection...')
    const { error: connectionError } = await supabase.from('accommodations').select('count').single()
    if (connectionError && connectionError.code !== 'PGRST116') {
      console.error('❌ Connection failed:', connectionError.message)
      return
    }
    console.log('✅ Connected to Supabase\n')

    // Sample accommodations
    console.log('🏨 Inserting accommodations...')
    const accommodations = [
      {
        title: 'Kigali Serena Hotel',
        description: 'Luxury hotel in the heart of Kigali with stunning city views, world-class amenities, and exceptional service.',
        type: 'hotel',
        price_per_night: 250.00,
        location: 'KN 3 Ave',
        city: 'Kigali',
        latitude: -1.9536,
        longitude: 30.0606,
        amenities: ['wifi', 'pool', 'spa', 'restaurant', 'gym', 'parking'],
        images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
        max_guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        rating: 4.8,
        review_count: 124,
        is_eco_friendly: false
      },
      {
        title: 'Volcanoes Eco Lodge',
        description: 'Sustainable eco-lodge near Volcanoes National Park, perfect for gorilla trekking adventures.',
        type: 'lodge',
        price_per_night: 180.00,
        location: 'Musanze District',
        city: 'Musanze',
        latitude: -1.4995,
        longitude: 29.6346,
        amenities: ['wifi', 'restaurant', 'eco-friendly', 'mountain-view'],
        images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
        max_guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        rating: 4.9,
        review_count: 89,
        is_eco_friendly: true
      },
      {
        title: 'Lake Kivu Beach Resort',
        description: 'Beachfront resort with stunning lake views, water sports, and relaxation facilities.',
        type: 'resort',
        price_per_night: 220.00,
        location: 'Rubavu District',
        city: 'Gisenyi',
        latitude: -1.6775,
        longitude: 29.2569,
        amenities: ['wifi', 'pool', 'beach', 'water-sports', 'restaurant'],
        images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d'],
        max_guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        rating: 4.7,
        review_count: 156,
        is_eco_friendly: false
      },
      {
        title: 'Akagera Safari Lodge',
        description: 'Wildlife safari lodge in Akagera National Park with game drives and bush experiences.',
        type: 'lodge',
        price_per_night: 200.00,
        location: 'Akagera National Park',
        city: 'Kayonza',
        latitude: -1.7461,
        longitude: 30.7444,
        amenities: ['wifi', 'restaurant', 'safari', 'wildlife-viewing'],
        images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd'],
        max_guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        rating: 4.8,
        review_count: 98,
        is_eco_friendly: true
      },
      {
        title: 'Kigali Heights Apartment',
        description: 'Modern apartment in downtown Kigali with city views and all amenities.',
        type: 'apartment',
        price_per_night: 80.00,
        location: 'Nyarugenge District',
        city: 'Kigali',
        latitude: -1.9441,
        longitude: 30.0619,
        amenities: ['wifi', 'kitchen', 'parking', 'city-view'],
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'],
        max_guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        rating: 4.5,
        review_count: 67,
        is_eco_friendly: false
      },
      {
        title: 'Nyungwe Forest Villa',
        description: 'Cozy villa near Nyungwe Forest National Park, ideal for chimpanzee trekking.',
        type: 'villa',
        price_per_night: 150.00,
        location: 'Nyungwe Forest',
        city: 'Rusizi',
        latitude: -2.4833,
        longitude: 29.2167,
        amenities: ['wifi', 'kitchen', 'fireplace', 'forest-view'],
        images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811'],
        max_guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        rating: 4.6,
        review_count: 78,
        is_eco_friendly: true
      }
    ]

    const { data: accData, error: accError } = await supabase
      .from('accommodations')
      .insert(accommodations)
      .select()

    if (accError) {
      console.error('❌ Error inserting accommodations:', accError.message)
    } else {
      console.log(`✅ Inserted ${accData.length} accommodations\n`)
    }

    // Sample tours
    console.log('🦍 Inserting tours...')
    const tours = [
      {
        title: 'Gorilla Trekking Experience',
        description: 'Once-in-a-lifetime mountain gorilla encounter in Volcanoes National Park with expert guides.',
        type: 'wildlife',
        price: 1500.00,
        duration_hours: 6,
        location: 'Volcanoes National Park',
        city: 'Musanze',
        images: ['https://images.unsplash.com/photo-1564760055775-d63b17a55c44'],
        max_participants: 8,
        difficulty_level: 'challenging',
        included_items: ['Park fees', 'Guide', 'Lunch', 'Water'],
        rating: 5.0,
        review_count: 234,
        is_eco_friendly: true
      },
      {
        title: 'Kigali City Cultural Tour',
        description: 'Comprehensive city tour including genocide memorial, local markets, and cultural centers.',
        type: 'cultural',
        price: 45.00,
        duration_hours: 4,
        location: 'Kigali City',
        city: 'Kigali',
        images: ['https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5'],
        max_participants: 15,
        difficulty_level: 'easy',
        included_items: ['Guide', 'Transport', 'Entrance fees'],
        rating: 4.7,
        review_count: 189,
        is_eco_friendly: false
      },
      {
        title: 'Akagera Safari Adventure',
        description: 'Full-day game drive spotting elephants, lions, giraffes, and more in Akagera National Park.',
        type: 'wildlife',
        price: 120.00,
        duration_hours: 8,
        location: 'Akagera National Park',
        city: 'Kayonza',
        images: ['https://images.unsplash.com/photo-1516426122078-c23e76319801'],
        max_participants: 6,
        difficulty_level: 'moderate',
        included_items: ['Park fees', 'Guide', 'Lunch', 'Binoculars'],
        rating: 4.8,
        review_count: 167,
        is_eco_friendly: true
      },
      {
        title: 'Lake Kivu Kayaking',
        description: 'Scenic kayaking adventure on Lake Kivu with island visits and swimming stops.',
        type: 'adventure',
        price: 60.00,
        duration_hours: 3,
        location: 'Lake Kivu',
        city: 'Gisenyi',
        images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5'],
        max_participants: 10,
        difficulty_level: 'moderate',
        included_items: ['Kayak', 'Life jacket', 'Guide', 'Snacks'],
        rating: 4.6,
        review_count: 145,
        is_eco_friendly: false
      },
      {
        title: 'Nyungwe Canopy Walk',
        description: 'Thrilling canopy walk suspension bridge experience high above the forest floor.',
        type: 'adventure',
        price: 80.00,
        duration_hours: 5,
        location: 'Nyungwe Forest National Park',
        city: 'Rusizi',
        images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e'],
        max_participants: 12,
        difficulty_level: 'moderate',
        included_items: ['Park fees', 'Guide', 'Safety gear'],
        rating: 4.9,
        review_count: 198,
        is_eco_friendly: true
      },
      {
        title: 'Traditional Village Tour',
        description: 'Immersive cultural experience visiting traditional villages, learning crafts, and meeting locals.',
        type: 'cultural',
        price: 50.00,
        duration_hours: 4,
        location: 'Huye District',
        city: 'Huye',
        images: ['https://images.unsplash.com/photo-1547036967-23d11aacaee0'],
        max_participants: 12,
        difficulty_level: 'easy',
        included_items: ['Guide', 'Transport', 'Traditional lunch'],
        rating: 4.7,
        review_count: 134,
        is_eco_friendly: false
      }
    ]

    const { data: tourData, error: tourError } = await supabase
      .from('tours')
      .insert(tours)
      .select()

    if (tourError) {
      console.error('❌ Error inserting tours:', tourError.message)
    } else {
      console.log(`✅ Inserted ${tourData.length} tours\n`)
    }

    // Sample transport options
    console.log('🚗 Inserting transport options...')
    const transportOptions = [
      {
        title: 'Kigali Airport Transfer - Private',
        description: 'Comfortable private transfer from Kigali International Airport to city hotels.',
        type: 'airport_transfer',
        vehicle_type: 'Sedan',
        price: 25.00,
        from_location: 'Kigali International Airport',
        to_location: 'Kigali City',
        max_passengers: 4,
        amenities: ['AC', 'wifi', 'luggage-space'],
        rating: 4.8,
        review_count: 456
      },
      {
        title: 'Kigali to Musanze Shuttle',
        description: 'Daily shuttle service between Kigali and Musanze for gorilla trekking.',
        type: 'shuttle',
        vehicle_type: 'Minibus',
        price: 15.00,
        from_location: 'Kigali',
        to_location: 'Musanze',
        max_passengers: 12,
        amenities: ['AC', 'comfortable-seats'],
        rating: 4.6,
        review_count: 289
      },
      {
        title: 'Luxury Car Rental - SUV',
        description: '4x4 SUV rental with driver for safari and countryside exploration.',
        type: 'car_rental',
        vehicle_type: 'SUV',
        price: 150.00,
        from_location: 'Kigali',
        to_location: 'Anywhere in Rwanda',
        max_passengers: 6,
        amenities: ['4x4', 'AC', 'wifi', 'GPS'],
        rating: 4.9,
        review_count: 178
      },
      {
        title: 'Kigali to Gisenyi Bus',
        description: 'Comfortable bus service to Lake Kivu with scenic route stops.',
        type: 'bus',
        vehicle_type: 'Coach',
        price: 12.00,
        from_location: 'Kigali',
        to_location: 'Gisenyi',
        max_passengers: 50,
        amenities: ['AC', 'restroom', 'wifi'],
        rating: 4.5,
        review_count: 234
      },
      {
        title: 'Private Driver - Full Day',
        description: 'Professional driver for full-day tours and excursions anywhere in Rwanda.',
        type: 'private_driver',
        vehicle_type: 'Sedan',
        price: 100.00,
        from_location: 'Kigali',
        to_location: 'Custom destination',
        max_passengers: 4,
        amenities: ['AC', 'wifi', 'water'],
        rating: 4.7,
        review_count: 201
      }
    ]

    const { data: transportData, error: transportError } = await supabase
      .from('transport_options')
      .insert(transportOptions)
      .select()

    if (transportError) {
      console.error('❌ Error inserting transport options:', transportError.message)
    } else {
      console.log(`✅ Inserted ${transportData.length} transport options\n`)
    }

    // Verify data
    console.log('🔍 Verifying database...')
    const { count: accCount } = await supabase.from('accommodations').select('*', { count: 'exact', head: true })
    const { count: tourCount } = await supabase.from('tours').select('*', { count: 'exact', head: true })
    const { count: transportCount } = await supabase.from('transport_options').select('*', { count: 'exact', head: true })

    console.log(`
📊 Database Summary:
   • Accommodations: ${accCount}
   • Tours: ${tourCount}
   • Transport Options: ${transportCount}

✨ Database setup complete! Your Merry_360 platform is ready to use.
`)

  } catch (error) {
    console.error('❌ Setup failed:', error.message)
  }
}

setupDatabase()
