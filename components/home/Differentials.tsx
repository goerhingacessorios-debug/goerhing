"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, CreditCard, Star } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Entrega Rápida",
    text: "Envio expresso para todo o Brasil com rastreamento.",
  },
  {
    icon: ShieldCheck,
    title: "Compra Segura",
    text: "Ambiente protegido e dados criptografados.",
  },
  {
    icon: CreditCard,
    title: "Parcelamento Facilitado",
    text: "Em até 12x sem juros no cartão de crédito.",
  },
  {
    icon: Star,
    title: "Produtos Premium",
    text: "Curadoria de marcas e qualidade garantida.",
  },
];

export default function Differentials() {
  return (
    <section className="bg-brand-black py-12">
      <div className="container-px grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex items-center gap-4 rounded-2xl bg-brand-graphite/60 p-5 ring-1 ring-white/5 transition-colors hover:bg-brand-graphite"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white">
              <item.icon size={24} />
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="mt-0.5 text-xs text-neutral-400">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
