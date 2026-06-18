"use client";

import type { Category } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export interface Filters {
  category: string;
  maxPrice: number;
  search: string;
  minRating: number;
}

export default function ProductFilters({
  filters,
  setFilters,
  priceMax,
  categories,
}: {
  filters: Filters;
  setFilters: (f: Filters) => void;
  priceMax: number;
  categories: Category[];
}) {
  return (
    <aside className="space-y-7">
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-black">
          Buscar
        </h3>
        <input
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Buscar produto..."
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-black">
          Categorias
        </h3>
        <div className="space-y-1">
          <button
            onClick={() => setFilters({ ...filters, category: "" })}
            className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              filters.category === ""
                ? "bg-brand-orange/10 font-semibold text-brand-orange"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            Todas as categorias
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setFilters({ ...filters, category: c.slug })}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                filters.category === c.slug
                  ? "bg-brand-orange/10 font-semibold text-brand-orange"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {c.name}
              <span className="text-xs text-neutral-400">{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-black">
          Faixa de Preço
        </h3>
        <input
          type="range"
          min={0}
          max={priceMax}
          step={50}
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: Number(e.target.value) })
          }
          className="w-full accent-brand-orange"
        />
        <div className="mt-2 flex justify-between text-xs text-neutral-500">
          <span>{formatPrice(0)}</span>
          <span className="font-semibold text-brand-black">
            até {formatPrice(filters.maxPrice)}
          </span>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-brand-black">
          Avaliação
        </h3>
        <div className="space-y-1">
          {[4, 3, 0].map((r) => (
            <button
              key={r}
              onClick={() => setFilters({ ...filters, minRating: r })}
              className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                filters.minRating === r
                  ? "bg-brand-orange/10 font-semibold text-brand-orange"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {r === 0 ? "Todas as avaliações" : `${r} estrelas ou mais`}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() =>
          setFilters({
            category: "",
            maxPrice: priceMax,
            search: "",
            minRating: 0,
          })
        }
        className="btn-outline w-full"
      >
        Limpar Filtros
      </button>
    </aside>
  );
}
