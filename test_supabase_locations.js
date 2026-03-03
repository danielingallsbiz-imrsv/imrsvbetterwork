import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLocations() {
    console.log("Fetching locations from Supabase...");
    const { data, error } = await supabase.from('locations').select('*');
    if (error) {
        console.error("Error fetching locations:");
        console.error(error);
    } else {
        console.log(`Success! Found ${data.length} locations.`);
        if (data.length > 0) {
            console.log("First location sample:", data[0]);
        }
    }
}

checkLocations();
