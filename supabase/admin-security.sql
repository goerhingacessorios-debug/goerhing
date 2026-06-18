-- ============================================================
-- GOERHING ACESSÓRIOS — Segurança do painel admin
-- Restringe a escrita de produtos/categorias/imagens apenas a
-- administradores. Rode no SQL Editor do Supabase (uma vez).
--
-- >>> TROQUE 'seu-email-admin@exemplo.com' pelo e-mail do seu
--     usuário admin (o mesmo criado em Authentication > Users).
-- ============================================================

create table if not exists public.admins (
  email text primary key
);

insert into public.admins (email) values
  ('seu-email-admin@exemplo.com')
on conflict (email) do nothing;

alter table public.admins enable row level security;

-- O usuário logado pode verificar se o próprio e-mail é admin
drop policy if exists "admins_self_read" on public.admins;
create policy "admins_self_read"
  on public.admins for select
  to authenticated
  using (email = (auth.jwt() ->> 'email'));

-- Função auxiliar: retorna true se o usuário logado é admin
create or replace function public.is_admin()
  returns boolean
  language sql
  security definer
  stable
  as $$
    select exists (
      select 1 from public.admins a
      where a.email = (auth.jwt() ->> 'email')
    );
  $$;

-- Produtos: escrita apenas admin (leitura continua pública)
drop policy if exists "produtos_escrita_admin" on public.products;
create policy "produtos_escrita_admin"
  on public.products for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Categorias: escrita apenas admin
drop policy if exists "categorias_escrita_admin" on public.categories;
create policy "categorias_escrita_admin"
  on public.categories for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- Storage (fotos): upload/alteração apenas admin
drop policy if exists "imagens_escrita_admin" on storage.objects;
create policy "imagens_escrita_admin"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'product-images' and public.is_admin())
  with check (bucket_id = 'product-images' and public.is_admin());
