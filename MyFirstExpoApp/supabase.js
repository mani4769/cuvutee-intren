import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zyeyszocdndeeoszppnm.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5ZXlzem9jZG5kZWVvc3pwcG5tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4ODIwMDUsImV4cCI6MjA2MzQ1ODAwNX0.gAZLa5WmPKv4RC7p70gpCKKsN-IPpJRTi9e2nQLcixU'; // Replace with your anon key

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);