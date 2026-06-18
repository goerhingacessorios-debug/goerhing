import { supabase, supabaseConfigured } from "./supabase";
import { products as mockProducts, categories as mockCategories } from "./data";
import type { Product, Category } from "./types";

/** Converte uma linha da tabela `products` do Supabase no tipo Product. */
function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    category: String(row.category ?? ""),
    categorySlug: String(row.category_slug ?? ""),
    price: Number(row.price ?? 0),
    oldPrice: row.old_price != null ? Number(row.old_price) : undefined,
    rating: Number(row.rating ?? 5),
    reviews: Number(row.reviews ?? 0),
    images: Array.isArray(row.images) ? (row.images as string[]) : [],
    description: String(row.description ?? ""),
    specs: Array.isArray(row.specs)
      ? (row.specs as { label: string; value: string }[])
      : [],
    badge: (row.badge as Product["badge"]) ?? undefined,
    stock: Number(row.stock ?? 0),
    featured: Boolean(row.featured),
    bestSeller: Boolean(row.best_seller),
  };
}

/** Converte um Product no formato de linha da tabela `products`. */
export function productToRow(p: Partial<Product>) {
  return {
    slug: p.slug,
    name: p.name,
    category: p.category,
    category_slug: p.categorySlug,
    price: p.price,
    old_price: p.oldPrice ?? null,
    rating: p.rating ?? 5,
    reviews: p.reviews ?? 0,
    images: p.images ?? [],
    description: p.description ?? "",
    specs: p.specs ?? [],
    badge: p.badge ?? null,
    stock: p.stock ?? 0,
    featured: p.featured ?? false,
    best_seller: p.bestSeller ?? false,
  };
}

/** Todos os produtos (Supabase quando configurado, senão os de exemplo). */
export async function getAllProducts(): Promise<Product[]> {
  if (supabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) return data.map(rowToProduct);
  }
  return mockProducts;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  const featured = all.filter((p) => p.featured);
  return featured.length ? featured : all.slice(0, 8);
}

export async function getBestSellers(): Promise<Product[]> {
  const all = await getAllProducts();
  const best = all.filter((p) => p.bestSeller);
  return best.length ? best : all.slice(0, 8);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getRelatedProducts(
  product: Product,
  limit = 4,
): Promise<Product[]> {
  const all = await getAllProducts();
  return all
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .concat(all.filter((p) => p.categorySlug !== product.categorySlug && p.id !== product.id))
    .slice(0, limit);
}

// ---------------- Categorias ----------------

export function categoryToRow(c: Partial<Category> & { sort?: number }) {
  return {
    slug: c.slug,
    name: c.name,
    icon: c.icon ?? "Package",
    description: c.description ?? "",
    sort: c.sort ?? 0,
  };
}

/** Categorias (Supabase quando configurado, senão as de exemplo). O `count`
 *  é calculado a partir dos produtos cadastrados. */
export async function getAllCategories(): Promise<Category[]> {
  if (supabaseConfigured && supabase) {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("sort", { ascending: true });
    if (!error && data && data.length) {
      const products = await getAllProducts();
      return data.map((row: Record<string, unknown>) => ({
        slug: String(row.slug),
        name: String(row.name),
        icon: String(row.icon ?? "Package"),
        description: String(row.description ?? ""),
        count: products.filter((p) => p.categorySlug === row.slug).length,
      }));
    }
  }
  return mockCategories;
}
