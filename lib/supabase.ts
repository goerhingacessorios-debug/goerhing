/**
 * Integração futura com Supabase.
 *
 * 1. Instale o client:  npm install @supabase/supabase-js
 * 2. Configure as variáveis em .env.local (veja .env.example)
 * 3. Descomente o bloco abaixo.
 *
 * Estrutura de tabelas sugerida:
 *  - products    (id, slug, name, category_id, price, old_price, rating, reviews, images[], description, specs jsonb, badge, stock, featured, best_seller)
 *  - categories  (id, slug, name, icon, description)
 *  - banners     (id, title, subtitle, image, cta, href, active, order)
 *  - orders      (id, customer_id, items jsonb, total, status, created_at)
 *  - customers   (id, name, email, phone, created_at)
 */

// import { createClient } from "@supabase/supabase-js";
//
// const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
//
// export const supabase = createClient(url, anonKey);

export const supabaseReady = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
