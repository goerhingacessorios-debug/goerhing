export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  images: string[];
  description: string;
  specs: { label: string; value: string }[];
  badge?: "Novo" | "Promoção" | "Mais Vendido";
  stock: number;
  featured?: boolean;
  bestSeller?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
  count: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readingTime: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
