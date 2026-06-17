import { Suspense } from "react";
import type { Metadata } from "next";
import ProductListing from "@/components/product/ProductListing";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Explore eletrônicos premium: smartphones, notebooks, tablets, áudio, smartwatches, games e acessórios.",
};

export default function ProdutosPage() {
  return (
    <Suspense
      fallback={
        <div className="container-px py-20 text-center text-neutral-500">
          Carregando produtos...
        </div>
      }
    >
      <ProductListing />
    </Suspense>
  );
}
