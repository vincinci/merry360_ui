# Supabase Setup Guide

## ✅ Completed Steps

1. **Supabase CLI Installed**: `/opt/homebrew/bin/supabase`
2. **Project Initialized**: `supabase init` completed
3. **Logged In**: Successfully authenticated with Supabase
4. **Project Linked**: Connected to project `Merry_360` (ID: aqrzvlwgkjwaqthsjxpt)
5. **Environment Variables**: `.env` file updated with:
   - `VITE_SUPABASE_URL=https://aqrzvlwgkjwaqthsjxpt.supabase.co`
   - `VITE_SUPABASE_ANON_KEY=[key configured]`
6. **Database Schema**: Migration created and pushed successfully
   - Tables: profiles, accommodations, tours, transport_options, bookings, reviews, wishlists
   - Row Level Security enabled
   - Indexes created for performance
   - Triggers for auto-updating timestamps

## 📋 Database Schema

### Tables Created:
- ✅ `profiles` - User profiles (extends auth.users)
- ✅ `accommodations` - Hotels, lodges, apartments
- ✅ `tours` - Tour packages and activities
- ✅ `transport_options` - Transportation services
- ✅ `bookings` - User bookings
- ✅ `reviews` - User reviews and ratings
- ✅ `wishlists` - User wishlist items

### Security:
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Policies configured for user data access
- ✅ Automatic profile creation on signup

## 🔄 Next Steps to Complete Setup

### 1. Add Sample Data (Manual Step)

Go to your Supabase dashboard and run the seed SQL:
1. Visit: https://supabase.com/dashboard/project/aqrzvlwgkjwaqthsjxpt/editor
2. Open SQL Editor
3. Copy and paste the contents of `supabase/seed.sql`
4. Click "Run"

This will populate your database with:
- 6 sample accommodations
- 6 sample tours
- 5 sample transport options

### 2. Enable Google OAuth

1. Go to: https://supabase.com/dashboard/project/aqrzvlwgkjwaqthsjxpt/auth/providers
2. Enable Google provider
3. Add your Google OAuth credentials
4. Update `.env` with `VITE_GOOGLE_CLIENT_ID`

### 3. Test the Connection

Run the development server and test authentication:
```bash
npm run dev
```

Try signing up a new user - this will:
- Create an auth user in Supabase
- Automatically create a profile in the profiles table
- Allow you to browse accommodations and tours

### 4. Configure Storage (Optional)

For image uploads:
1. Go to: https://supabase.com/dashboard/project/aqrzvlwgkjwaqthsjxpt/storage/buckets
2. Create buckets:
   - `accommodations` - For accommodation images
   - `tours` - For tour images
   - `profiles` - For user avatars
3. Set policies to allow authenticated uploads

## 🔑 API Keys Reference

Your Supabase project credentials are stored in `.env`:

```env
VITE_SUPABASE_URL=https://aqrzvlwgkjwaqthsjxpt.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🧪 Testing the Integration

### Test Authentication:
```javascript
import { supabaseAuth } from '@/services/supabase'

// Sign up
const { user, error } = await supabaseAuth.signUp({
  email: 'test@example.com',
  password: 'password123',
  userData: { full_name: 'Test User', role: 'user' }
})

// Sign in
const { user, error } = await supabaseAuth.signIn({
  email: 'test@example.com',
  password: 'password123'
})
```

### Test Database Queries:
```javascript
import { supabaseDB } from '@/services/supabase'

// Get accommodations
const accommodations = await supabaseDB.getAccommodations({
  filters: { city: 'Kigali', priceRange: [0, 200] }
})

// Get tours
const tours = await supabaseDB.getTours({
  filters: { type: 'wildlife' }
})
```

## 📚 Useful Commands

```bash
# Check project status
supabase projects list

# View database schema
supabase db pull

# Generate TypeScript types
supabase gen types typescript --linked > src/types/supabase.ts

# View migrations
ls supabase/migrations/

# View logs
supabase functions logs --project-ref aqrzvlwgkjwaqthsjxpt
```

## 🔗 Important Links

- **Project Dashboard**: https://supabase.com/dashboard/project/aqrzvlwgkjwaqthsjxpt
- **SQL Editor**: https://supabase.com/dashboard/project/aqrzvlwgkjwaqthsjxpt/editor
- **Auth Settings**: https://supabase.com/dashboard/project/aqrzvlwgkjwaqthsjxpt/auth/users
- **Storage**: https://supabase.com/dashboard/project/aqrzvlwgkjwaqthsjxpt/storage/buckets
- **API Docs**: https://supabase.com/dashboard/project/aqrzvlwgkjwaqthsjxpt/api

## 🐛 Troubleshooting

### Connection Issues:
- Verify `.env` file has correct values
- Check if `VITE_` prefix is present (required for Vite)
- Restart dev server after changing `.env`

### RLS Policy Issues:
- Make sure user is authenticated
- Check policies in dashboard
- Use service role key for admin operations (backend only)

### Migration Issues:
```bash
# Reset and reapply migrations
supabase db push --linked
```

## ✨ What's Working Now

Your app is now connected to Supabase and ready for:
- ✅ User authentication (email/password)
- ✅ User profile management
- ✅ Accommodation browsing and filtering
- ✅ Tour listings
- ✅ Transport options
- ✅ Booking creation
- ✅ Reviews and ratings
- ✅ Wishlist functionality

Just add the sample data via SQL Editor and you're good to go!
