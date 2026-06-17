# GOERHING ACESSÓRIOS — E-commerce Premium

E-commerce moderno, rápido e responsivo para venda de eletrônicos, celulares
e acessórios premium.

## 🚀 Tecnologias

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animações)
- **Lucide Icons** + **React Icons** (marcas)
- SEO otimizado (metadata, sitemap, robots)
- Design 100% responsivo

## 🎨 Identidade visual

| Cor            | Hex       |
| -------------- | --------- |
| Preto          | `#111111` |
| Cinza Grafite  | `#2D2D2D` |
| Laranja        | `#FF6A00` |
| Branco         | `#FFFFFF` |

## 📦 Instalação

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## 🏗️ Build de produção

```bash
npm run build
npm run start
```

## 📁 Estrutura

```
app/
  page.tsx              # Home
  produtos/             # Listagem com filtros, ordenação e paginação
  produto/[slug]/       # Página de produto (galeria, zoom, specs, relacionados)
  sobre/                # Página institucional com estatísticas animadas
  blog/                 # Blog + artigo individual
  contato/              # Formulário, mapa e infos
  login/                # Login / Cadastro
  favoritos/            # Lista de favoritos
  checkout/             # Checkout
  admin/                # Painel administrativo
    produtos/ categorias/ banners/ pedidos/ clientes/
components/
  home/ layout/ product/ blog/ contact/ cart/ admin/ ui/
context/
  StoreContext.tsx      # Carrinho + favoritos (localStorage)
lib/
  data.ts               # Dados mockados
  types.ts utils.ts supabase.ts
```

## 🛒 Funcionalidades

- Carrossel hero premium com transições automáticas
- Produtos em destaque, mais vendidos (carrossel) e categorias
- Banners promocionais e seção de diferenciais
- Carrinho lateral (drawer) com persistência em `localStorage`
- Favoritos persistentes
- Busca, filtros por categoria/preço/avaliação, ordenação e paginação
- Página de produto com zoom de imagem e abas de descrição/especificações
- Painel administrativo com CRUD de produtos (mock) e gestão de categorias,
  banners, pedidos e clientes
- Botão flutuante de WhatsApp
- Newsletter

## 🗄️ Integração com Supabase (futura)

A base está preparada em `lib/supabase.ts`. Para ativar:

1. `npm install @supabase/supabase-js`
2. Configure `.env.local` com base em `.env.example`
3. Descomente o client em `lib/supabase.ts`

## ☁️ Deploy na Vercel

1. Faça push do repositório para o GitHub
2. Importe o projeto na [Vercel](https://vercel.com)
3. Deploy automático — nenhuma configuração extra necessária

---

© GOERHING ACESSÓRIOS
