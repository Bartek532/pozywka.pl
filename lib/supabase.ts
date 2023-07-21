import { createClient } from "@supabase/supabase-js";

import { env } from "env/server";

export const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_KEY);
