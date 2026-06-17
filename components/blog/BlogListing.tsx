"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Calendar, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { blogPosts } from "@/lib/data";

export default function BlogListing() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const cats = useMemo(
    () => Array.from(new Set(blogPosts.map((p) => p.category))),
    [],
  );

  const filtered = blogPosts.filter((p) => {
    if (category && p.category !== category) return false;
    if (
      search &&
      !`${p.title} ${p.excerpt}`.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  const [featured, ...rest] = filtered;

  return (
    <div className="container-px py-10 lg:py-14">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
          GOERHING Blog
        </span>
        <h1 className="mt-2 text-3xl font-black text-brand-black sm:text-4xl">
          Dicas, novidades e tendências
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-neutral-500">
          Conteúdo exclusivo sobre eletrônicos, celulares, gadgets e tecnologia.
        </p>
      </div>

      {/* Search + categories */}
      <div className="mt-8 flex flex-col items-center gap-4">
        <div className="flex w-full max-w-md items-center rounded-full border border-neutral-200 bg-white">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar artigos..."
            className="w-full bg-transparent px-5 py-3 text-sm outline-none"
          />
          <span className="m-1 flex h-9 w-10 items-center justify-center rounded-full bg-brand-orange text-white">
            <Search size={17} />
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCategory("")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              category === ""
                ? "bg-brand-orange text-white"
                : "bg-white text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            Todos
          </button>
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                category === c
                  ? "bg-brand-orange text-white"
                  : "bg-white text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-neutral-500">
          Nenhum artigo encontrado.
        </p>
      ) : (
        <>
          {/* Featured */}
          {featured && !category && !search && (
            <Link href={`/blog/${featured.slug}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group mt-10 grid overflow-hidden rounded-3xl border border-neutral-100 bg-white md:grid-cols-2"
              >
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <span className="w-fit rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">
                    {featured.category}
                  </span>
                  <h2 className="mt-3 text-2xl font-bold text-brand-black transition-colors group-hover:text-brand-orange">
                    {featured.title}
                  </h2>
                  <p className="mt-2 text-neutral-600">{featured.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> {featured.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {featured.readingTime}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          )}

          {/* Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(category || search ? filtered : rest).map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-all hover:-translate-y-1 hover:shadow-premium"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-brand-black/80 px-3 py-1 text-xs font-semibold text-white">
                      {post.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-bold leading-snug text-brand-black transition-colors group-hover:text-brand-orange">
                      {post.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Clock size={13} /> {post.readingTime}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-brand-orange">
                        Ler mais <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
