-- Step 1: Add photo_url column to locations table
ALTER TABLE public.locations ADD COLUMN IF NOT EXISTS photo_url TEXT;

-- Step 2: Update Speakeasies
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800&q=80' WHERE name = 'La Oculta' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80' WHERE name = 'Victoria Regia' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=800&q=80' WHERE name = 'La Cruda' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80' WHERE name = 'Mombasa' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80' WHERE name = 'Password Bar' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?w=800&q=80' WHERE name = 'La Pascasia' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80' WHERE name = 'Casa de la Luna' AND city_slug = 'medellin';

-- Step 3: Update Techno / Music clubs
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80' WHERE name = 'Xeroclub' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800&q=80' WHERE name = 'Sonorama' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80' WHERE name = 'Calle 9+1 (Calle 9)' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80' WHERE name = 'Salón Amador' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&q=80' WHERE name = 'Heard From' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80' WHERE name = 'La Octava' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1571266752414-d6e4a0f04839?w=800&q=80' WHERE name = 'Son Havana' AND city_slug = 'medellin';

-- Step 4: Update Restaurants / Cafes
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80' WHERE name = 'Pergamino' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80' WHERE name = 'El Social' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80' WHERE name = 'Carmen' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80' WHERE name = 'Alambique' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80' WHERE name = 'Bonuar' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800&q=80' WHERE name = 'Mondongos' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=800&q=80' WHERE name = 'Huerto' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800&q=80' WHERE name = 'Tesoro' AND city_slug = 'medellin';

-- Step 5: Workspaces
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80' WHERE name = 'Selina' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80' WHERE name = 'Atom House' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80' WHERE name = 'Coworking El Poblado' AND city_slug = 'medellin';

-- Step 6: Vintage / Thrift
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80' WHERE name = 'Calle del Tiempo Perdido' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80' WHERE name = 'Trueque Market' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&q=80' WHERE name = 'Vintage Lab' AND city_slug = 'medellin';

-- Step 7: Experiences
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80' WHERE name = 'Mercado del Río' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80' WHERE name = 'Parque Arví' AND city_slug = 'medellin';
UPDATE public.locations SET photo_url = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80' WHERE name = 'Plaza Minorista' AND city_slug = 'medellin';

-- Catch-all: assign a moody Medellín atmosphere photo to any location missing a photo
UPDATE public.locations 
SET photo_url = 'https://images.unsplash.com/photo-1583242810204-5a5fb7f44c43?w=800&q=80'
WHERE city_slug = 'medellin' AND (photo_url IS NULL OR photo_url = '');
