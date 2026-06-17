import ProductCard from "@/components/product/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { featuredProducts } from "@/lib/data";

export default function FeaturedProducts() {
  return (
    <section className="container-px py-14 lg:py-20">
      <SectionHeader
        eyebrow="Seleção GOERHING"
        title="Produtos em Destaque"
        description="Os acessórios mais desejados, escolhidos a dedo pela nossa equipe."
        href="/produtos"
      />
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {featuredProducts.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
