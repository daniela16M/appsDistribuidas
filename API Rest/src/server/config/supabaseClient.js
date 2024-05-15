import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.JS_SUPABASE_URL;
const supabaseKey = process.env.JS_SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
