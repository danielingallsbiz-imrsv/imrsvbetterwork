import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only create the client if the URL and Key are valid strings to prevent crashing
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_project_url')
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        from: () => ({
            select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }),
            insert: () => ({ select: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }) }),
            delete: () => ({ eq: () => Promise.resolve({ error: new Error('Supabase not configured') }) })
        })
    };
