import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** true quando as variáveis de ambiente do Supabase estão definidas. */
export const supabaseConfigured = Boolean(url && anonKey);

/**
 * Cliente do Supabase. É `null` quando as variáveis não estão configuradas —
 * nesse caso o site usa os produtos de exemplo (mock) como fallback.
 */
export const supabase: SupabaseClient | null = supabaseConfigured
  ? createClient(url as string, anonKey as string)
  : null;

/** Nome do bucket de Storage onde ficam as fotos dos produtos. */
export const PRODUCT_BUCKET = "product-images";
