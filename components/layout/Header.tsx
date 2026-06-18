"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
  LogOut,
} from "lucide-react";
import Logo from "@/components/ui/Logo";
import { useStore } from "@/context/StoreContext";
import { categories as fallbackCategories } from "@/lib/data";
import { getAllCategories } from "@/lib/catalog";
import type { Category } from "@/lib/types";

const NAV = [
  { label: "Início", href: "/" },
  { label: "Produtos", href: "/produtos" },
  { label: "Categorias", href: "/produtos", dropdown: true },
  { label: "Promoções", href: "/produtos?promo=true" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const { cartCount, favoritesCount, setCartOpen, user, signOut } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [catOpen, setCatOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    getAllCategories().then(setCategories).catch(() => {});
  }, []);

  function search(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/produtos?busca=${encodeURIComponent(query)}`);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar — letreiro deslizante */}
      <div className="overflow-hidden bg-brand-black py-2 text-xs font-semibold tracking-wide text-white">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((group) => (
            <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="flex items-center">
                  <span>TODO O SITE 10% OFF — ENTREGAMOS PARA TODO BRASIL</span>
                  <span className="mx-6 text-brand-orange">★</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-neutral-100 bg-white/95 backdrop-blur">
        <div className="container-px flex h-16 items-center gap-4 lg:h-20">
          <button
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>

          <Logo />

          {/* Search */}
          <form
            onSubmit={search}
            className="ml-auto hidden flex-1 max-w-xl items-center md:flex"
          >
            <div className="flex w-full items-center rounded-full border border-neutral-200 bg-neutral-50 focus-within:border-brand-orange focus-within:ring-2 focus-within:ring-brand-orange/20">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar acessórios, marcas e mais..."
                className="w-full bg-transparent px-5 py-2.5 text-sm outline-none placeholder:text-neutral-400"
              />
              <button
                type="submit"
                className="m-1 flex h-9 w-11 items-center justify-center rounded-full bg-brand-orange text-white transition-colors hover:bg-brand-orange-dark"
                aria-label="Buscar"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1 md:ml-4 md:gap-2">
            {user ? (
              <div
                className="relative hidden sm:block"
                onMouseEnter={() => setAccountOpen(true)}
                onMouseLeave={() => setAccountOpen(false)}
              >
                <button className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-brand-black transition-colors hover:bg-neutral-100">
                  <User size={20} />
                  <span className="hidden max-w-[110px] truncate lg:inline">
                    {(user.user_metadata?.name as string)?.split(" ")[0] ||
                      "Minha conta"}
                  </span>
                </button>
                {accountOpen && (
                  <div className="absolute right-0 top-full z-50 w-44 rounded-xl border border-neutral-100 bg-white p-1.5 shadow-premium">
                    <Link
                      href="/favoritos"
                      className="block rounded-lg px-3 py-2 text-sm hover:bg-neutral-50"
                    >
                      Meus favoritos
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-500 hover:bg-red-50"
                    >
                      <LogOut size={15} /> Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-brand-black transition-colors hover:bg-neutral-100 sm:flex"
              >
                <User size={20} />
                <span className="hidden lg:inline">Entrar</span>
              </Link>
            )}
            <Link
              href="/favoritos"
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-neutral-100"
              aria-label="Favoritos"
            >
              <Heart size={20} />
              {favoritesCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">
                  {favoritesCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-neutral-100"
              aria-label="Carrinho"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden border-t border-neutral-100 lg:block">
          <div className="container-px flex h-12 items-center gap-1">
            {NAV.map((item) =>
              item.dropdown ? (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setCatOpen(true)}
                  onMouseLeave={() => setCatOpen(false)}
                >
                  <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-brand-graphite transition-colors hover:text-brand-orange">
                    {item.label}
                    <ChevronDown size={15} />
                  </button>
                  {catOpen && (
                    <div className="absolute left-0 top-full z-50 grid w-[520px] grid-cols-2 gap-1 rounded-2xl border border-neutral-100 bg-white p-3 shadow-premium">
                      {categories.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/produtos?categoria=${c.slug}`}
                          className="rounded-xl px-3 py-2.5 transition-colors hover:bg-neutral-50"
                        >
                          <span className="block text-sm font-semibold text-brand-black">
                            {c.name}
                          </span>
                          <span className="block text-xs text-neutral-500">
                            {c.count} produtos
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand-orange ${
                    pathname === item.href
                      ? "text-brand-orange"
                      : "text-brand-graphite"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <Logo />
              <button onClick={() => setMobileOpen(false)} aria-label="Fechar">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={search} className="mb-6">
              <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-50">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="w-full bg-transparent px-4 py-2.5 text-sm outline-none"
                />
                <button className="m-1 flex h-9 w-10 items-center justify-center rounded-full bg-brand-orange text-white">
                  <Search size={18} />
                </button>
              </div>
            </form>
            <div className="flex flex-col gap-1">
              {NAV.map((item) =>
                item.dropdown ? (
                  <div key={item.label}>
                    <button
                      onClick={() => setMobileCatOpen((o) => !o)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-brand-graphite hover:bg-neutral-50"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${
                          mobileCatOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileCatOpen && (
                      <div className="ml-3 flex flex-col border-l border-neutral-100 pl-3">
                        {categories.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/produtos?categoria=${c.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="rounded-lg px-3 py-2.5 text-sm text-brand-graphite hover:bg-neutral-50"
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-3 py-3 text-sm font-medium text-brand-graphite hover:bg-neutral-50"
                  >
                    {item.label}
                  </Link>
                ),
              )}
              {user ? (
                <button
                  onClick={() => {
                    signOut();
                    setMobileOpen(false);
                  }}
                  className="mt-3 btn-outline"
                >
                  <LogOut size={18} /> Sair ({(user.user_metadata?.name as string)?.split(" ")[0] || "conta"})
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 btn-dark"
                >
                  <User size={18} /> Entrar / Cadastrar
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
