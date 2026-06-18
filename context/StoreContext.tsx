"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import type { CartItem, Product } from "@/lib/types";
import { supabase } from "@/lib/supabase";

interface StoreContextValue {
  cart: CartItem[];
  favorites: string[];
  cartCount: number;
  cartTotal: number;
  favoritesCount: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  user: User | null;
  signOut: () => Promise<void>;
}

const StoreContext = createContext<StoreContextValue | null>(null);

/** Combina dois carrinhos somando as quantidades de produtos iguais. */
function mergeCarts(a: CartItem[], b: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();
  for (const item of [...a, ...b]) {
    const existing = map.get(item.product.id);
    if (existing) existing.quantity += item.quantity;
    else map.set(item.product.id, { ...item });
  }
  return Array.from(map.values());
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const loadingRemote = useRef(false);

  // Hidrata carrinho/favoritos do localStorage
  useEffect(() => {
    try {
      const c = localStorage.getItem("goerhing-cart");
      const f = localStorage.getItem("goerhing-favorites");
      if (c) setCart(JSON.parse(c));
      if (f) setFavorites(JSON.parse(f));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem("goerhing-cart", JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (hydrated)
      localStorage.setItem("goerhing-favorites", JSON.stringify(favorites));
  }, [favorites, hydrated]);

  // Sessão do Supabase + carregamento do carrinho do cliente
  useEffect(() => {
    if (!supabase) return;
    let active = true;

    async function loadUserCart(u: User) {
      if (!supabase) return;
      loadingRemote.current = true;
      const { data } = await supabase
        .from("carts")
        .select("items")
        .eq("user_id", u.id)
        .maybeSingle();
      const remote: CartItem[] = Array.isArray(data?.items) ? data!.items : [];
      setCart((local) => {
        const merged = mergeCarts(local, remote);
        // salva o carrinho mesclado de volta
        supabase!
          .from("carts")
          .upsert({ user_id: u.id, items: merged, updated_at: new Date().toISOString() })
          .then(() => {});
        return merged;
      });
      loadingRemote.current = false;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      const u = data.session?.user ?? null;
      setUser(u);
      if (u) loadUserCart(u);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) loadUserCart(u);
    });

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Sincroniza alterações do carrinho com o Supabase (cliente logado)
  useEffect(() => {
    if (!supabase || !user || !hydrated || loadingRemote.current) return;
    const t = setTimeout(() => {
      supabase!
        .from("carts")
        .upsert({
          user_id: user.id,
          items: cart,
          updated_at: new Date().toISOString(),
        })
        .then(() => {});
    }, 600);
    return () => clearTimeout(t);
  }, [cart, user, hydrated]);

  function addToCart(product: Product, quantity = 1) {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { product, quantity }];
    });
    setCartOpen(true);
  }

  function removeFromCart(productId: string) {
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
  }

  function updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i)),
    );
  }

  function clearCart() {
    setCart([]);
  }

  function toggleFavorite(productId: string) {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut();
    setUser(null);
  }

  const value = useMemo<StoreContextValue>(() => {
    const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0);
    const cartTotal = cart.reduce(
      (acc, i) => acc + i.product.price * i.quantity,
      0,
    );
    return {
      cart,
      favorites,
      cartCount,
      cartTotal,
      favoritesCount: favorites.length,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleFavorite,
      isFavorite: (id: string) => favorites.includes(id),
      isCartOpen,
      setCartOpen,
      user,
      signOut,
    };
  }, [cart, favorites, isCartOpen, user]);

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore deve ser usado dentro de StoreProvider");
  return ctx;
}
