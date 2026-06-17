"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, X, Search } from "lucide-react";
import { products as initialProducts, categories } from "@/lib/data";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

type Draft = {
  id?: string;
  name: string;
  category: string;
  price: string;
  stock: string;
};

const empty: Draft = { name: "", category: categories[0].name, price: "", stock: "" };

export default function ProductsManager() {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [draft, setDraft] = useState<Draft>(empty);

  const filtered = items.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  function openNew() {
    setDraft(empty);
    setModal(true);
  }

  function openEdit(p: Product) {
    setDraft({
      id: p.id,
      name: p.name,
      category: p.category,
      price: String(p.price),
      stock: String(p.stock),
    });
    setModal(true);
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    const price = parseFloat(draft.price) || 0;
    const stock = parseInt(draft.stock) || 0;
    if (draft.id) {
      setItems((prev) =>
        prev.map((p) =>
          p.id === draft.id
            ? { ...p, name: draft.name, category: draft.category, price, stock }
            : p,
        ),
      );
    } else {
      const newProduct: Product = {
        id: String(Date.now()),
        slug: draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: draft.name,
        category: draft.category,
        categorySlug:
          categories.find((c) => c.name === draft.category)?.slug || "tecnologia",
        price,
        rating: 5,
        reviews: 0,
        images: ["https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"],
        description: "Novo produto cadastrado.",
        specs: [],
        stock,
      };
      setItems((prev) => [newProduct, ...prev]);
    }
    setModal(false);
  }

  function remove(id: string) {
    if (confirm("Excluir este produto?")) {
      setItems((prev) => prev.filter((p) => p.id !== id));
    }
  }

  const field =
    "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-brand-orange";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Produtos</h1>
          <p className="text-sm text-neutral-500">{items.length} produtos cadastrados</p>
        </div>
        <button onClick={openNew} className="btn-primary">
          <Plus size={18} /> Novo Produto
        </button>
      </div>

      <div className="flex w-full max-w-md items-center rounded-full border border-neutral-200 bg-white px-4 py-2">
        <Search size={16} className="text-neutral-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar produto..."
          className="ml-2 w-full bg-transparent text-sm outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50 text-left text-xs uppercase text-neutral-400">
                <th className="px-5 py-3 font-medium">Produto</th>
                <th className="px-5 py-3 font-medium">Categoria</th>
                <th className="px-5 py-3 font-medium">Preço</th>
                <th className="px-5 py-3 font-medium">Estoque</th>
                <th className="px-5 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-neutral-50 hover:bg-neutral-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                        <Image src={p.images[0]} alt={p.name} fill sizes="40px" className="object-cover" />
                      </div>
                      <span className="line-clamp-1 font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-neutral-600">{p.category}</td>
                  <td className="px-5 py-3 font-semibold">{formatPrice(p.price)}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        p.stock > 10
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {p.stock} un.
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-brand-orange"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => remove(p.id)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-red-50 hover:text-red-500"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModal(false)} />
          <form
            onSubmit={save}
            className="relative w-full max-w-md space-y-4 rounded-2xl bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {draft.id ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button type="button" onClick={() => setModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Nome</label>
              <input
                required
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                className={field}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Categoria</label>
              <select
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value })}
                className={field}
              >
                {categories.map((c) => (
                  <option key={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Preço (R$)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  value={draft.price}
                  onChange={(e) => setDraft({ ...draft, price: e.target.value })}
                  className={field}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Estoque</label>
                <input
                  required
                  type="number"
                  value={draft.stock}
                  onChange={(e) => setDraft({ ...draft, stock: e.target.value })}
                  className={field}
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setModal(false)} className="btn-outline flex-1">
                Cancelar
              </button>
              <button type="submit" className="btn-primary flex-1">
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
