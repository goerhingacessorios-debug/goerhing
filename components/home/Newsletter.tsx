"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 4000);
  }

  return (
    <section className="container-px py-14 lg:py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-orange to-brand-orange-dark px-6 py-12 text-center sm:px-12 sm:py-16"
      >
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <div className="absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-black/10" />
        <div className="relative mx-auto max-w-2xl">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white">
            <Mail size={26} />
          </span>
          <h2 className="mt-5 text-3xl font-black text-white sm:text-4xl">
            Receba ofertas exclusivas
          </h2>
          <p className="mt-3 text-white/90">
            Cadastre-se e receba descontos, novidades e lançamentos em primeira
            mão.
          </p>
          <form
            onSubmit={submit}
            className="mx-auto mt-7 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu melhor e-mail"
              className="w-full rounded-full border-0 px-5 py-3.5 text-sm text-brand-black outline-none ring-2 ring-transparent focus:ring-white"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-brand-black px-7 py-3.5 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            >
              {sent ? (
                <span className="flex items-center gap-2">
                  <Check size={16} /> Inscrito!
                </span>
              ) : (
                "Quero Receber"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}
