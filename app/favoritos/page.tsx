"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { getAllProducts } from "@/lib/catalog";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/product/ProductCard";
import Breadcrumb from "@/components/ui/Breadcrumb";

export default function FavoritosPage() {
  const { favorites } = useStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const list = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="container-px py-10 lg:py-14">
      <Breadcrumb items={[{ label: "Favoritos" }]} />
      <h1 className="mt-4 flex items-center gap-2 text-2xl font-black text-brand-black sm:text-3xl">
        <Heart className="text-brand-orange" /> Meus Favoritos
      </h1>

      {list.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-neutral-300 py-20 text-center">
          <Heart size={48} className="mx-auto text-neutral-300" />
          <p className="mt-4 text-neutral-500">
            Você ainda não adicionou produtos aos favoritos.
          </p>
          <Link href="/produtos" className="btn-primary mt-6">
            Explorar produtos
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
