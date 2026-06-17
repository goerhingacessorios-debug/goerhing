"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const banners = [
  {
    title: "Qualidade que acompanha você",
    subtitle: "Eletrônicos premium feitos para durar.",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1200&q=80",
    href: "/produtos",
    align: "left",
  },
  {
    title: "Tecnologia, estilo e desempenho",
    subtitle: "O futuro da tecnologia nas suas mãos.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    href: "/produtos?categoria=smartphones",
    align: "right",
  },
];

export default function PromoBanners() {
  return (
    <section className="container-px py-6">
      <div className="grid gap-5 md:grid-cols-2">
        {banners.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group relative h-56 overflow-hidden rounded-2xl sm:h-64"
          >
            <Image
              src={b.image}
              alt={b.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div
              className={`absolute inset-0 bg-gradient-to-r ${
                b.align === "right"
                  ? "from-transparent to-brand-black/90"
                  : "from-brand-black/90 to-transparent"
              }`}
            />
            <div
              className={`absolute inset-0 flex flex-col justify-center p-6 sm:p-8 ${
                b.align === "right" ? "items-end text-right" : "items-start"
              }`}
            >
              <h3 className="max-w-[80%] text-xl font-bold leading-tight text-white sm:max-w-[60%] sm:text-3xl">
                {b.title}
              </h3>
              <p className="mt-2 max-w-[80%] text-sm text-neutral-200 sm:max-w-[60%]">
                {b.subtitle}
              </p>
              <Link
                href={b.href}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-orange-dark hover:shadow-glow"
              >
                Conferir
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
