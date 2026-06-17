import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanners from "@/components/home/PromoBanners";
import CategoriesSection from "@/components/home/CategoriesSection";
import BestSellers from "@/components/home/BestSellers";
import Differentials from "@/components/home/Differentials";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <PromoBanners />
      <CategoriesSection />
      <BestSellers />
      <Differentials />
      <Newsletter />
    </>
  );
}
