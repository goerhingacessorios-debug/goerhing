"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { categories } from "@/lib/data";

export default function CategoriesSection() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="container-px">
        <SectionHeader
          eyebrow="Navegue por"
          title="Categorias"
          description="Encontre exatamente o que você precisa em tecnologia."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const Icon =
              (Icons[cat.icon as keyof typeof Icons] as React.ComponentType<{
                size?: number;
                className?: string;
              }>) || Icons.Package;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/produtos?categoria=${cat.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-neutral-100 bg-neutral-50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/30 hover:bg-white hover:shadow-premium"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-black text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white">
                    <Icon size={28} />
                  </span>
                  <span className="text-sm font-bold text-brand-black">
                    {cat.name}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {cat.count} produtos
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
