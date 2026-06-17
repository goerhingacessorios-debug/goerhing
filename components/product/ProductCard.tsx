"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { useStore } from "@/context/StoreContext";
import { formatPrice, discountPercent, installment } from "@/lib/utils";
import Rating from "@/components/ui/Rating";

const badgeColors: Record<string, string> = {
  Novo: "bg-emerald-500",
  Promoção: "bg-brand-orange",
  "Mais Vendido": "bg-brand-black",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const discount = discountPercent(product.price, product.oldPrice);
  const fav = isFavorite(product.id);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-shadow hover:shadow-premium"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        <Link href={`/produto/${product.slug}`}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span
              className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${
                badgeColors[product.badge]
              }`}
            >
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold text-white">
              -{discount}%
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
          <button
            onClick={() => toggleFavorite(product.id)}
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-colors ${
              fav ? "text-red-500" : "text-brand-black hover:text-brand-orange"
            }`}
            aria-label="Favoritar"
          >
            <Heart size={17} className={fav ? "fill-red-500" : ""} />
          </button>
          <Link
            href={`/produto/${product.slug}`}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand-black shadow-md transition-colors hover:text-brand-orange"
            aria-label="Ver produto"
          >
            <Eye size={17} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-medium text-brand-orange">
          {product.category}
        </span>
        <Link href={`/produto/${product.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-brand-black transition-colors hover:text-brand-orange">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2">
          <Rating value={product.rating} reviews={product.reviews} />
        </div>

        <div className="mt-3">
          {product.oldPrice && (
            <span className="text-xs text-neutral-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-bold text-brand-black">
              {formatPrice(product.price)}
            </span>
          </div>
          <span className="text-[11px] text-neutral-500">
            {installment(product.price)}
          </span>
        </div>

        <button
          onClick={() => addToCart(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-brand-black py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-orange active:scale-95"
        >
          <ShoppingCart size={16} />
          Comprar
        </button>
      </div>
    </motion.div>
  );
}
