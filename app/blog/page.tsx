import type { Metadata } from "next";
import BlogListing from "@/components/blog/BlogListing";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Dicas, novidades e tendências sobre eletrônicos, celulares, tecnologia e gadgets.",
};

export default function BlogPage() {
  return <BlogListing />;
}
