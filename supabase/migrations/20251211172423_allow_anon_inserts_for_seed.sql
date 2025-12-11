-- Allow anonymous inserts for seeding (temporary - will be removed after seeding)
-- This allows the seed script to insert data without authentication

-- Accommodations - Allow anonymous inserts without host_id requirement
CREATE POLICY "Allow anonymous inserts for seeding accommodations"
  ON public.accommodations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Tours - Allow anonymous inserts without vendor_id requirement
CREATE POLICY "Allow anonymous inserts for seeding tours"
  ON public.tours FOR INSERT
  TO anon
  WITH CHECK (true);

-- Transport - Allow anonymous inserts without vendor_id requirement
CREATE POLICY "Allow anonymous inserts for seeding transport"
  ON public.transport_options FOR INSERT
  TO anon
  WITH CHECK (true);
