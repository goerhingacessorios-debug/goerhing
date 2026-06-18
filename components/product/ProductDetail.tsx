"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Heart, Check, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import type { Product } from "@/lib/types";
import { useStore } from "@/context/StoreContext";
import { formatPrice, discountPercent, installment } from "@/lib/utils";
import ProductGallery from "./ProductGallery";
import ProductCard from "./ProductCard";
import Rating from "@/components/ui/Rating";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { addToCart, setCartOpen, toggleFavorite, isFavorite } = useStore();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "specs">("desc");
  const discount = discountPercent(product.price, product.oldPrice);
  const fav = isFavorite(product.id);

  return (
    <div className="container-px py-8 lg:py-12">
      <Breadcrumb
        items={[
          { label: product.category, href: `/produtos?categoria=${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <span className="text-sm font-semibold text-brand-orange">
            {product.category}
          </span>
          <h1 className="mt-1 text-2xl font-black text-brand-black sm:text-3xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} reviews={product.reviews} size={16} />
            <span
              className={`text-sm font-semibold ${
                product.stock > 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {product.stock > 0 ? "Em estoque" : "ESGOTADO"}
            </span>
          </div>

          <div className="mt-6 rounded-2xl bg-neutral-50 p-5">
            {product.oldPrice && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-400 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                {discount && (
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    -{discount}%
                  </span>
                )}
              </div>
            )}
            <div className="mt-1 text-3xl font-black text-brand-black">
              {formatPrice(product.price)}
            </div>
            <p className="mt-1 text-sm text-neutral-600">
              {installment(product.price)}
            </p>
            <p className="text-xs text-neutral-500">
              ou {formatPrice(product.price * 0.9)} no Pix (10% off)
            </p>
          </div>

          {/* Quantity + actions */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-full border border-neutral-200">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-neutral-100"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-neutral-100"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => toggleFavorite(product.id)}
              className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
                fav
                  ? "border-red-200 bg-red-50 text-red-500"
                  : "border-neutral-200 hover:border-brand-orange hover:text-brand-orange"
              }`}
              aria-label="Favoritar"
            >
              <Heart size={18} className={fav ? "fill-red-500" : ""} />
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                addToCart(product, qty);
              }}
              className="btn-outline flex-1 py-3.5"
            >
              <ShoppingCart size={18} /> Adicionar ao Carrinho
            </button>
            <button
              onClick={() => {
                addToCart(product, qty);
                setCartOpen(true);
              }}
              className="btn-primary flex-1 py-3.5"
            >
              Comprar Agora
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-6 grid grid-cols-3 gap-3 border-t border-neutral-100 pt-6 text-center">
            {[
              { icon: Truck, label: "Entrega rápida" },
              { icon: ShieldCheck, label: "Compra segura" },
              { icon: RefreshCw, label: "Troca fácil" },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1.5">
                <b.icon size={22} className="text-brand-orange" />
                <span className="text-xs text-neutral-600">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14">
        <div className="flex gap-2 border-b border-neutral-200">
          <button
            onClick={() => setTab("desc")}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === "desc"
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-neutral-500 hover:text-brand-black"
            }`}
          >
            Descrição
          </button>
          <button
            onClick={() => setTab("specs")}
            className={`-mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
              tab === "specs"
                ? "border-brand-orange text-brand-orange"
                : "border-transparent text-neutral-500 hover:text-brand-black"
            }`}
          >
            Especificações
          </button>
        </div>
        <div className="py-6">
          {tab === "desc" ? (
            <p className="max-w-3xl leading-relaxed text-neutral-600">
              {product.description}
            </p>
          ) : (
            <div className="max-w-2xl overflow-hidden rounded-xl border border-neutral-100">
              {product.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex justify-between px-5 py-3 text-sm ${
                    i % 2 === 0 ? "bg-neutral-50" : "bg-white"
                  }`}
                >
                  <span className="font-medium text-neutral-500">{s.label}</span>
                  <span className="font-semibold text-brand-black">
                    {s.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="section-title mb-6 flex items-center gap-2">
            <Check size={22} className="text-brand-orange" />
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
