# Configuração do Supabase — Painel Admin

O painel `/admin` gerencia produtos (criar, editar nome/preço, enviar fotos,
excluir) salvando tudo no **Supabase**. Sem configurar, o site funciona em
**modo demonstração** (usa os produtos de exemplo e não salva alterações).

Siga os passos abaixo **uma vez**:

## 1. Criar o projeto

1. Acesse https://supabase.com e crie uma conta grátis.
2. **New Project** → defina nome e senha do banco → aguarde provisionar.

## 2. Criar as tabelas e o bucket de imagens

1. No menu lateral: **SQL Editor** → **New query**.
2. Cole todo o conteúdo do arquivo [`supabase/schema.sql`](./supabase/schema.sql).
3. Clique em **Run**. Isso cria a tabela `products`, as permissões (RLS) e o
   bucket público `product-images`.

## 3. Pegar as chaves

1. Menu lateral: **Project Settings** → **API**.
2. Copie:
   - **Project URL** → vai em `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → vai em `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 4. Configurar as variáveis de ambiente

### Localmente
Crie um arquivo `.env.local` na raiz (baseado no `.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
```

### Na Vercel
**Project → Settings → Environment Variables** → adicione as duas variáveis
acima → **Redeploy**.

## 5. Criar o usuário admin (login do painel)

1. No Supabase: **Authentication** → **Users** → **Add user** → defina e-mail e
   senha.
2. Use esse e-mail/senha para entrar em `/admin`.

> Dica: em **Authentication → Providers → Email**, desative "Confirm email"
> para o login funcionar imediatamente sem confirmação.

## 6. Importar os produtos de exemplo (opcional)

Ao abrir `/admin/produtos` com o banco vazio, clique em **Importar exemplos**
para popular a loja com os 12 produtos iniciais. Depois é só editar/adicionar.

---

Pronto! A partir daí, tudo que você cadastrar no painel aparece na loja para
todos os visitantes, em qualquer dispositivo.
