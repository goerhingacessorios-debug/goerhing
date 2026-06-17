-- ============================================================
-- GOERHING ACESSÓRIOS — Schema do Supabase
-- Rode este script no SQL Editor do Supabase (uma vez).
-- ============================================================

-- Tabela de produtos
create table if not exists public.products (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  slug         text not null unique,
  name         text not null,
  category     text,
  category_slug text,
  price        numeric not null default 0,
  old_price    numeric,
  rating       numeric not null default 5,
  reviews      integer not null default 0,
  images       text[] not null default '{}',
  description  text default '',
  specs        jsonb not null default '[]',
  badge        text,
  stock        integer not null default 0,
  featured     boolean not null default false,
  best_seller  boolean not null default false
);

-- ------------------------------------------------------------
-- Row Level Security (RLS)
-- ------------------------------------------------------------
alter table public.products enable row level security;

-- Qualquer pessoa pode LER os produtos (loja pública)
drop policy if exists "produtos_leitura_publica" on public.products;
create policy "produtos_leitura_publica"
  on public.products for select
  to anon, authenticated
  using (true);

-- Apenas usuários autenticados (admin logado) podem ESCREVER
drop policy if exists "produtos_escrita_admin" on public.products;
create policy "produtos_escrita_admin"
  on public.products for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- Storage — bucket público para as fotos dos produtos
-- ============================================================
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

-- Leitura pública das imagens
drop policy if exists "imagens_leitura_publica" on storage.objects;
create policy "imagens_leitura_publica"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

-- Upload / alteração apenas para admin autenticado
drop policy if exists "imagens_escrita_admin" on storage.objects;
create policy "imagens_escrita_admin"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'product-images')
  with check (bucket_id = 'product-images');
