import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://bfapnigzfdqkiuvowvdv.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_8w52FwvnBQym366XVa3HsA_jvNmV...'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
