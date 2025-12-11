-- Enable pgcrypto extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'host', 'admin', 'vendor')),
  avatar_url TEXT,
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create accommodations table
CREATE TABLE IF NOT EXISTS public.accommodations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('hotel', 'resort', 'apartment', 'villa', 'guesthouse', 'lodge')),
  price_per_night DECIMAL(10, 2) NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'Rwanda',
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  amenities TEXT[],
  images TEXT[],
  thumbnail_url TEXT,
  virtual_tour_url TEXT,
  max_guests INTEGER NOT NULL DEFAULT 2,
  bedrooms INTEGER NOT NULL DEFAULT 1,
  bathrooms INTEGER NOT NULL DEFAULT 1,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_eco_friendly BOOLEAN DEFAULT false,
  eco_certifications TEXT[],
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tours table
CREATE TABLE IF NOT EXISTS public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('wildlife', 'cultural', 'adventure', 'city', 'nature', 'photography')),
  price DECIMAL(10, 2) NOT NULL,
  duration_hours INTEGER NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT DEFAULT 'Rwanda',
  images TEXT[],
  thumbnail_url TEXT,
  max_participants INTEGER NOT NULL DEFAULT 10,
  min_participants INTEGER DEFAULT 1,
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'moderate', 'challenging', 'extreme')),
  included_items TEXT[],
  excluded_items TEXT[],
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_eco_friendly BOOLEAN DEFAULT false,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transport_options table
CREATE TABLE IF NOT EXISTS public.transport_options (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('airport_transfer', 'car_rental', 'bus', 'private_driver', 'shuttle')),
  vehicle_type TEXT,
  price DECIMAL(10, 2) NOT NULL,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  max_passengers INTEGER NOT NULL DEFAULT 4,
  amenities TEXT[],
  images TEXT[],
  thumbnail_url TEXT,
  rating DECIMAL(3, 2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  booking_type TEXT NOT NULL CHECK (booking_type IN ('accommodation', 'tour', 'transport')),
  item_id UUID NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  guests INTEGER DEFAULT 1,
  total_price DECIMAL(10, 2) NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  payment_method TEXT,
  payment_intent_id TEXT,
  special_requests TEXT,
  booking_details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('accommodation', 'tour', 'transport')),
  item_id UUID NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wishlists table
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL CHECK (item_type IN ('accommodation', 'tour', 'transport')),
  item_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, item_type, item_id)
);

-- Create indexes
CREATE INDEX idx_accommodations_location ON public.accommodations(city, location);
CREATE INDEX idx_accommodations_price ON public.accommodations(price_per_night);
CREATE INDEX idx_accommodations_rating ON public.accommodations(rating);
CREATE INDEX idx_accommodations_eco ON public.accommodations(is_eco_friendly);
CREATE INDEX idx_tours_location ON public.tours(city, location);
CREATE INDEX idx_tours_price ON public.tours(price);
CREATE INDEX idx_tours_type ON public.tours(type);
CREATE INDEX idx_bookings_user ON public.bookings(user_id);
CREATE INDEX idx_bookings_date ON public.bookings(start_date);
CREATE INDEX idx_reviews_item ON public.reviews(item_type, item_id);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accommodations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Accommodations policies
CREATE POLICY "Accommodations are viewable by everyone"
  ON public.accommodations FOR SELECT
  USING (true);

CREATE POLICY "Hosts can insert own accommodations"
  ON public.accommodations FOR INSERT
  WITH CHECK (auth.uid() = host_id);

CREATE POLICY "Hosts can update own accommodations"
  ON public.accommodations FOR UPDATE
  USING (auth.uid() = host_id);

CREATE POLICY "Hosts can delete own accommodations"
  ON public.accommodations FOR DELETE
  USING (auth.uid() = host_id);

-- Tours policies
CREATE POLICY "Tours are viewable by everyone"
  ON public.tours FOR SELECT
  USING (true);

CREATE POLICY "Vendors can insert own tours"
  ON public.tours FOR INSERT
  WITH CHECK (auth.uid() = vendor_id);

CREATE POLICY "Vendors can update own tours"
  ON public.tours FOR UPDATE
  USING (auth.uid() = vendor_id);

CREATE POLICY "Vendors can delete own tours"
  ON public.tours FOR DELETE
  USING (auth.uid() = vendor_id);

-- Transport policies
CREATE POLICY "Transport options are viewable by everyone"
  ON public.transport_options FOR SELECT
  USING (true);

CREATE POLICY "Vendors can insert own transport options"
  ON public.transport_options FOR INSERT
  WITH CHECK (auth.uid() = vendor_id);

CREATE POLICY "Vendors can update own transport options"
  ON public.transport_options FOR UPDATE
  USING (auth.uid() = vendor_id);

CREATE POLICY "Vendors can delete own transport options"
  ON public.transport_options FOR DELETE
  USING (auth.uid() = vendor_id);

-- Bookings policies
CREATE POLICY "Users can view own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON public.reviews FOR DELETE
  USING (auth.uid() = user_id);

-- Wishlists policies
CREATE POLICY "Users can view own wishlists"
  ON public.wishlists FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wishlist items"
  ON public.wishlists FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own wishlist items"
  ON public.wishlists FOR DELETE
  USING (auth.uid() = user_id);

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.accommodations
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.tours
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.transport_options
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.bookings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
