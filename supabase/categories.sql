-- ============================================================
-- GOERHING ACESSÓRIOS — Tabela de Categorias
-- Rode este script no SQL Editor do Supabase (uma vez).
-- ============================================================

create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  slug        text not null unique,
  name        text not null,
  icon        text not null default 'Package',
  description text default '',
  sort        integer not null default 0
);

alter table public.categories enable row level security;

drop policy if exists "categorias_leitura_publica" on public.categories;
create policy "categorias_leitura_publica"
  on public.categories for select
  to anon, authenticated
  using (true);

drop policy if exists "categorias_escrita_admin" on public.categories;
create policy "categorias_escrita_admin"
  on public.categories for all
  to authenticated
  using (true)
  with check (true);

-- Categorias iniciais
insert into public.categories (slug, name, icon, description, sort) values
  ('smartphones', 'Smartphones', 'Smartphone', 'Celulares de última geração das melhores marcas.', 1),
  ('notebooks', 'Notebooks', 'Laptop', 'Notebooks para trabalho, estudo e games.', 2),
  ('tablets', 'Tablets', 'Tablet', 'Tablets potentes para produtividade e lazer.', 3),
  ('audio', 'Áudio', 'Headphones', 'Fones, caixas de som e áudio de alta fidelidade.', 4),
  ('smartwatches', 'Smartwatches', 'Watch', 'Relógios inteligentes para saúde e produtividade.', 5),
  ('games', 'Games', 'Gamepad2', 'Consoles, controles e periféricos gamer.', 6),
  ('acessorios', 'Acessórios', 'Cable', 'Carregadores, cabos, capas e power banks.', 7),
  ('casa-inteligente', 'Casa Inteligente', 'House', 'Lâmpadas, tomadas e dispositivos smart home.', 8)
on conflict (slug) do nothing;
