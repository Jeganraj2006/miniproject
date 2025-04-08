// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fptfvocfyuyxuxioulzj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwdGZ2b2NmeXV5eHV4aW91bHpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3ODc1MjYsImV4cCI6MjA1OTM2MzUyNn0.BI6VdbVA_MnwjlO3PHtWpj-e-RHV_CpaISNVpo-DtUg'

export const supabase = createClient(supabaseUrl, supabaseKey)
