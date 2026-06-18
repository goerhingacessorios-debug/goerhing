import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanners from "@/components/home/PromoBanners";
import CategoriesSection from "@/components/home/CategoriesSection";
import BestSellers from "@/components/home/BestSellers";
import Differentials from "@/components/home/Differentials";
import Newsletter from "@/components/home/Newsletter";
import {
  getFeaturedProducts,
  getBestSellers,
  getAllCategories,
} from "@/lib/catalog";

export const revalidate = 60;

export default async function HomePage() {
  const [featured, bestSellers, categories] = await Promise.all([
    getFeaturedProducts(),
    getBestSellers(),
    getAllCategories(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedProducts products={featured} />
      <PromoBanners />
      <CategoriesSection categories={categories} />
      <BestSellers products={bestSellers} />
      <Differentials />
      <Newsletter />
    </>
  );
}
