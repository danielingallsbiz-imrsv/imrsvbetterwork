-- Create locations table
CREATE TABLE IF NOT EXISTS public.locations (
    id uuid NOT NULL DEFAULT extensions.gen_random_uuid(),
    city text NULL,
    city_slug text NULL,
    country text NULL,
    category text NULL,
    subcategory text NULL,
    name text NULL,
    neighborhood text NULL,
    what_it_is text NULL,
    why_it_matters text NULL,
    instagram text NULL,
    website text NULL,
    address_text text NULL,
    lat numeric NULL,
    lng numeric NULL,
    hours_text text NULL,
    price_hint text NULL,
    partner_status text NULL,
    locked boolean NULL DEFAULT false,
    sort_rank integer NULL DEFAULT 999,
    created_at timestamp with time zone NULL DEFAULT now(),
    CONSTRAINT locations_pkey PRIMARY KEY (id)
);

-- Enable RLS (Optional, depending on your setup)
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users
CREATE POLICY "Allow public read access to locations" ON public.locations FOR SELECT USING (true);
