-- ============================================================
-- GOERHING ACESSÓRIOS — Carrinhos dos clientes
-- Rode no SQL Editor do Supabase (uma vez).
-- ============================================================

create table if not exists public.carts (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  items      jsonb not null default '[]',
  updated_at timestamptz not null default now()
);

alter table public.carts enable row level security;

-- Cada cliente só enxerga/edita o próprio carrinho
drop policy if exists "carrinho_proprio_leitura" on public.carts;
create policy "carrinho_proprio_leitura"
  on public.carts for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "carrinho_proprio_escrita" on public.carts;
create policy "carrinho_proprio_escrita"
  on public.carts for all
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
