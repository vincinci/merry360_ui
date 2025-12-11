-- Seed file for sample data
-- Note: Run this after users are created through the auth system

-- Sample accommodations
INSERT INTO public.accommodations (title, description, type, price_per_night, location, city, latitude, longitude, amenities, images, max_guests, bedrooms, bathrooms, rating, review_count, is_eco_friendly) VALUES
('Kigali Serena Hotel', 'Luxury hotel in the heart of Kigali with stunning city views, world-class amenities, and exceptional service.', 'hotel', 250.00, 'KN 3 Ave', 'Kigali', -1.9536, 30.0606, ARRAY['wifi', 'pool', 'spa', 'restaurant', 'gym', 'parking'], ARRAY['https://images.unsplash.com/photo-1566073771259-6a8506099945'], 4, 2, 2, 4.8, 124, false),
('Volcanoes Eco Lodge', 'Sustainable eco-lodge near Volcanoes National Park, perfect for gorilla trekking adventures.', 'lodge', 180.00, 'Musanze District', 'Musanze', -1.4995, 29.6346, ARRAY['wifi', 'restaurant', 'eco-friendly', 'mountain-view'], ARRAY['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'], 2, 1, 1, 4.9, 89, true),
('Lake Kivu Beach Resort', 'Beachfront resort with stunning lake views, water sports, and relaxation facilities.', 'resort', 220.00, 'Rubavu District', 'Gisenyi', -1.6775, 29.2569, ARRAY['wifi', 'pool', 'beach', 'water-sports', 'restaurant'], ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d'], 6, 3, 2, 4.7, 156, false),
('Akagera Safari Lodge', 'Wildlife safari lodge in Akagera National Park with game drives and bush experiences.', 'lodge', 200.00, 'Akagera National Park', 'Kayonza', -1.7461, 30.7444, ARRAY['wifi', 'restaurant', 'safari', 'wildlife-viewing'], ARRAY['https://images.unsplash.com/photo-1582719508461-905c673771fd'], 4, 2, 2, 4.8, 98, true),
('Kigali Heights Apartment', 'Modern apartment in downtown Kigali with city views and all amenities.', 'apartment', 80.00, 'Nyarugenge District', 'Kigali', -1.9441, 30.0619, ARRAY['wifi', 'kitchen', 'parking', 'city-view'], ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'], 4, 2, 1, 4.5, 67, false),
('Nyungwe Forest Villa', 'Cozy villa near Nyungwe Forest National Park, ideal for chimpanzee trekking.', 'villa', 150.00, 'Nyungwe Forest', 'Rusizi', -2.4833, 29.2167, ARRAY['wifi', 'kitchen', 'fireplace', 'forest-view'], ARRAY['https://images.unsplash.com/photo-1613490493576-7fde63acd811'], 6, 3, 2, 4.6, 78, true);

-- Sample tours
INSERT INTO public.tours (title, description, type, price, duration_hours, location, city, images, max_participants, difficulty_level, included_items, rating, review_count, is_eco_friendly) VALUES
('Gorilla Trekking Experience', 'Once-in-a-lifetime mountain gorilla encounter in Volcanoes National Park with expert guides.', 'wildlife', 1500.00, 6, 'Volcanoes National Park', 'Musanze', ARRAY['https://images.unsplash.com/photo-1564760055775-d63b17a55c44'], 8, 'challenging', ARRAY['Park fees', 'Guide', 'Lunch', 'Water'], 5.0, 234, true),
('Kigali City Cultural Tour', 'Comprehensive city tour including genocide memorial, local markets, and cultural centers.', 'cultural', 45.00, 4, 'Kigali City', 'Kigali', ARRAY['https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5'], 15, 'easy', ARRAY['Guide', 'Transport', 'Entrance fees'], 4.7, 189, false),
('Akagera Safari Adventure', 'Full-day game drive spotting elephants, lions, giraffes, and more in Akagera National Park.', 'wildlife', 120.00, 8, 'Akagera National Park', 'Kayonza', ARRAY['https://images.unsplash.com/photo-1516426122078-c23e76319801'], 6, 'moderate', ARRAY['Park fees', 'Guide', 'Lunch', 'Binoculars'], 4.8, 167, true),
('Lake Kivu Kayaking', 'Scenic kayaking adventure on Lake Kivu with island visits and swimming stops.', 'adventure', 60.00, 3, 'Lake Kivu', 'Gisenyi', ARRAY['https://images.unsplash.com/photo-1544551763-46a013bb70d5'], 10, 'moderate', ARRAY['Kayak', 'Life jacket', 'Guide', 'Snacks'], 4.6, 145, false),
('Nyungwe Canopy Walk', 'Thrilling canopy walk suspension bridge experience high above the forest floor.', 'adventure', 80.00, 5, 'Nyungwe Forest National Park', 'Rusizi', ARRAY['https://images.unsplash.com/photo-1441974231531-c6227db76b6e'], 12, 'moderate', ARRAY['Park fees', 'Guide', 'Safety gear'], 4.9, 198, true),
('Traditional Village Tour', 'Immersive cultural experience visiting traditional villages, learning crafts, and meeting locals.', 'cultural', 50.00, 4, 'Huye District', 'Huye', ARRAY['https://images.unsplash.com/photo-1547036967-23d11aacaee0'], 12, 'easy', ARRAY['Guide', 'Transport', 'Traditional lunch'], 4.7, 134, false);

-- Sample transport options
INSERT INTO public.transport_options (title, description, type, vehicle_type, price, from_location, to_location, max_passengers, amenities, rating, review_count) VALUES
('Kigali Airport Transfer - Private', 'Comfortable private transfer from Kigali International Airport to city hotels.', 'airport_transfer', 'Sedan', 25.00, 'Kigali International Airport', 'Kigali City', 4, ARRAY['AC', 'wifi', 'luggage-space'], 4.8, 456),
('Kigali to Musanze Shuttle', 'Daily shuttle service between Kigali and Musanze for gorilla trekking.', 'shuttle', 'Minibus', 15.00, 'Kigali', 'Musanze', 12, ARRAY['AC', 'comfortable-seats'], 4.6, 289),
('Luxury Car Rental - SUV', '4x4 SUV rental with driver for safari and countryside exploration.', 'car_rental', 'SUV', 150.00, 'Kigali', 'Anywhere in Rwanda', 6, ARRAY['4x4', 'AC', 'wifi', 'GPS'], 4.9, 178),
('Kigali to Gisenyi Bus', 'Comfortable bus service to Lake Kivu with scenic route stops.', 'bus', 'Coach', 12.00, 'Kigali', 'Gisenyi', 50, ARRAY['AC', 'restroom', 'wifi'], 4.5, 234),
('Private Driver - Full Day', 'Professional driver for full-day tours and excursions anywhere in Rwanda.', 'private_driver', 'Sedan', 100.00, 'Kigali', 'Custom destination', 4, ARRAY['AC', 'wifi', 'water'], 4.7, 201);

