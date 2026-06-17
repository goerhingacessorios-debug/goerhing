import { Suspense } from "react";
import type { Metadata } from "next";
import ProductListing from "@/components/product/ProductListing";
import { getAllProducts } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Explore eletrônicos premium: smartphones, notebooks, tablets, áudio, smartwatches, games e acessórios.",
};

export const revalidate = 60;

export default async function ProdutosPage() {
  const products = await getAllProducts();
  return (
    <Suspense
      fallback={
        <div className="container-px py-20 text-center text-neutral-500">
          Carregando produtos...
        </div>
      }
    >
      <ProductListing initialProducts={products} />
    </Suspense>
  );
}
