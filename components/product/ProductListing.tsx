"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import type { Product, Category } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters, { type Filters } from "@/components/product/ProductFilters";
import Breadcrumb from "@/components/ui/Breadcrumb";

const PRICE_MAX = 7000;
const PER_PAGE = 8;

const SORTS = [
  { value: "relevance", label: "Relevância" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "rating", label: "Melhor avaliados" },
  { value: "name", label: "Nome (A-Z)" },
];

export default function ProductListing({
  initialProducts,
  categories,
}: {
  initialProducts: Product[];
  categories: Category[];
}) {
  const params = useSearchParams();
  const promo = params.get("promo") === "true";

  const [filters, setFilters] = useState<Filters>({
    category: params.get("categoria") || "",
    maxPrice: PRICE_MAX,
    search: params.get("busca") || "",
    minRating: 0,
  });
  const [sort, setSort] = useState("relevance");
  const [page, setPage] = useState(1);
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = initialProducts.filter((p) => {
      if (filters.category && p.categorySlug !== filters.category) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.minRating && p.rating < filters.minRating) return false;
      if (promo && !p.oldPrice) return false;
      if (
        filters.search &&
        !`${p.name} ${p.category}`
          .toLowerCase()
          .includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    return list;
  }, [filters, sort, promo, initialProducts]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (current - 1) * PER_PAGE,
    current * PER_PAGE,
  );

  function update(f: Filters) {
    setFilters(f);
    setPage(1);
  }

  return (
    <div className="container-px py-8 lg:py-12">
      <Breadcrumb items={[{ label: promo ? "Promoções" : "Produtos" }]} />

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-black text-brand-black sm:text-3xl">
            {promo ? "Promoções" : "Todos os Produtos"}
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            {filtered.length} produto{filtered.length !== 1 && "s"} encontrado
            {filtered.length !== 1 && "s"}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-8 lg:flex-row">
        {/* Desktop filters */}
        <div className="hidden w-64 shrink-0 lg:block">
          <ProductFilters
            filters={filters}
            setFilters={update}
            priceMax={PRICE_MAX}
            categories={categories}
          />
        </div>

        {/* Main */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between gap-3 rounded-xl border border-neutral-100 bg-white p-3">
            <button
              onClick={() => setMobileFilters(true)}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium lg:hidden"
            >
              <SlidersHorizontal size={16} /> Filtros
            </button>
            <span className="hidden items-center gap-2 text-sm text-neutral-500 lg:flex">
              <LayoutGrid size={16} /> Exibindo {paginated.length} de{" "}
              {filtered.length}
            </span>
            <div className="flex items-center gap-2">
              <label className="text-sm text-neutral-500">Ordenar:</label>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-orange"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {paginated.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 py-20 text-center text-neutral-500">
              Nenhum produto encontrado com os filtros selecionados.
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
            >
              {paginated.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-colors ${
                    current === i + 1
                      ? "bg-brand-orange text-white"
                      : "border border-neutral-200 text-brand-black hover:border-brand-orange hover:text-brand-orange"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-5">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold">Filtros</h2>
              <button onClick={() => setMobileFilters(false)}>
                <X size={22} />
              </button>
            </div>
            <ProductFilters
              filters={filters}
              setFilters={update}
              priceMax={PRICE_MAX}
              categories={categories}
            />
          </div>
        </div>
      )}
    </div>
  );
}
