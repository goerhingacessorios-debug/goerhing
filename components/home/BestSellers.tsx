"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Product } from "@/lib/types";

export default function BestSellers({ products }: { products: Product[] }) {
  const scroller = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    if (!scroller.current) return;
    const amount = scroller.current.clientWidth * 0.8;
    scroller.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="container-px py-14 lg:py-20">
      <div className="flex items-end justify-between">
        <SectionHeader
          eyebrow="Os queridinhos"
          title="Mais Vendidos"
          description="Produtos que conquistaram milhares de clientes."
        />
        <div className="mb-8 hidden gap-2 sm:flex">
          <button
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 transition-colors hover:border-brand-orange hover:text-brand-orange"
            aria-label="Anterior"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 transition-colors hover:border-brand-orange hover:text-brand-orange"
            aria-label="Próximo"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="hide-scrollbar flex snap-x gap-4 overflow-x-auto pb-2 sm:gap-5"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[70%] shrink-0 snap-start sm:w-[45%] lg:w-[23.5%]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
