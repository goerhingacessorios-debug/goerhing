"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Search,
  Upload,
  Loader2,
  ImagePlus,
} from "lucide-react";
import { categories, products as seedProducts } from "@/lib/data";
import { getAllProducts, productToRow } from "@/lib/catalog";
import { supabase, supabaseConfigured, PRODUCT_BUCKET } from "@/lib/supabase";
import type { Product } from "@/lib/types";
import { formatPrice, slugify } from "@/lib/utils";

type Draft = {
  id?: string;
  name: string;
  category: string;
  price: string;
  oldPrice: string;
  stock: string;
  description: string;
  images: string[];
  featured: boolean;
  bestSeller: boolean;
};

const emptyDraft: Draft = {
  name: "",
  category: categories[0].name,
  price: "",
  oldPrice: "",
  stock: "",
  description: "",
  images: [],
  featured: false,
  bestSeller: false,
};

export default function ProductsManager() {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [seeding, setSeeding] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getAllProducts()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  const filtered = items.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  function openNew() {
    setDraft(emptyDraft);
    setUrlInput("");
    setModal(true);
  }

  function openEdit(p: Product) {
    setDraft({
      id: p.id,
      name: p.name,
      category: p.category,
      price: String(p.price),
      oldPrice: p.oldPrice ? String(p.oldPrice) : "",
      stock: String(p.stock),
      description: p.description,
      images: p.images,
      featured: !!p.featured,
      bestSeller: !!p.bestSeller,
    });
    setUrlInput("");
    setModal(true);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || !files.length) return;
    if (!supabase) {
      // Sem Supabase: usa preview local (base64) apenas para demonstração
      const readers = Array.from(files).map(
        (f) =>
          new Promise<string>((res) => {
            const r = new FileReader();
            r.onload = () => res(r.result as string);
            r.readAsDataURL(f);
          }),
      );
      const urls = await Promise.all(readers);
      setDraft((d) => ({ ...d, images: [...d.images, ...urls] }));
      return;
    }
    setUploading(true);
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from(PRODUCT_BUCKET)
        .upload(path, file, { upsert: false });
      if (error) {
        alert("Erro ao enviar imagem: " + error.message);
        continue;
      }
      const { data } = supabase.storage.from(PRODUCT_BUCKET).getPublicUrl(path);
      uploaded.push(data.publicUrl);
    }
    setDraft((d) => ({ ...d, images: [...d.images, ...uploaded] }));
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function addImageUrl() {
    if (!urlInput.trim()) return;
    setDraft((d) => ({ ...d, images: [...d.images, urlInput.trim()] }));
    setUrlInput("");
  }

  function removeImage(i: number) {
    setDraft((d) => ({ ...d, images: d.images.filter((_, idx) => idx !== i) }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const cat = categories.find((c) => c.name === draft.category);
    const product: Product = {
      id: draft.id ?? String(Date.now()),
      slug: slugify(draft.name),
      name: draft.name,
      category: draft.category,
      categorySlug: cat?.slug ?? "tecnologia",
      price: parseFloat(draft.price) || 0,
      oldPrice: draft.oldPrice ? parseFloat(draft.oldPrice) : undefined,
      rating: 5,
      reviews: 0,
      images: draft.images.length
        ? draft.images
        : [
            "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=800&q=80",
          ],
      description: draft.description,
      specs: [],
      stock: parseInt(draft.stock) || 0,
      featured: draft.featured,
      bestSeller: draft.bestSeller,
    };

    if (supabaseConfigured && supabase) {
      if (draft.id) {
        const { data, error } = await supabase
          .from("products")
          .update(productToRow(product))
          .eq("id", draft.id)
          .select()
          .single();
        if (error) {
          alert("Erro ao salvar: " + error.message);
          setSaving(false);
          return;
        }
        setItems((prev) =>
          prev.map((p) => (p.id === draft.id ? { ...product, id: data.id } : p)),
        );
      } else {
        const { data, error } = await supabase
          .from("products")
          .insert(productToRow(product))
          .select()
          .single();
        if (error) {
          alert("Erro ao salvar: " + error.message);
          setSaving(false);
          return;
        }
        setItems((prev) => [{ ...product, id: data.id }, ...prev]);
      }
    } else {
      // Fallback local (não persiste)
      if (draft.id) {
        setItems((prev) => prev.map((p) => (p.id === draft.id ? product : p)));
      } else {
        setItems((prev) => [product, ...prev]);
      }
    }
    setSaving(false);
    setModal(false);
  }

  async function seedExamples() {
    if (!supabase) return;
    if (!confirm("Importar os 12 produtos de exemplo para o banco?")) return;
    setSeeding(true);
    const rows = seedProducts.map((p) => productToRow(p));
    const { data, error } = await supabase
      .from("products")
      .insert(rows)
      .select();
    if (error) {
      alert("Erro ao importar: " + error.message);
    } else if (data) {
      const fresh = await getAllProducts();
      setItems(fresh);
    }
    setSeeding(false);
  }

  async function remove(id: string) {
    if (!confirm("Excluir este produto?")) return;
    if (supabaseConfigured && supabase) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        alert("Erro ao excluir: " + error.message);
        return;
      }
    }
    setItems((prev) => prev.filter((p) => p.id !== id));
  }

  const field =
    "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-brand-orange";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Produtos</h1>
          <p className="text-sm text-neutral-500">
            {items.length} produtos
            {!supabaseConfigured && " (modo demonstração — não salva)"}
          </p>
        </div>
        <div className="flex gap-2">
          {supabaseConfigured && !loading && items.length === 0 && (
            <button
              onClick={seedExamples}
              disabled={seeding}
              className="btn-outline disabled:opacity-60"
            >
              {seeding ? "Importando..." : "Importar exemplos"}
            </button>
          )}
          <button onClick={openNew} className="btn-primary">
            <Plus size={18} /> Novo Produto
          </button>
        </div>
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

      {loading ? (
        <div className="flex items-center gap-2 py-20 text-neutral-500">
          <Loader2 className="animate-spin" size={18} /> Carregando produtos...
        </div>
      ) : (
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
                  <tr
                    key={p.id}
                    className="border-b border-neutral-50 hover:bg-neutral-50"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                          {p.images[0] && (
                            <Image
                              src={p.images[0]}
                              alt={p.name}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          )}
                        </div>
                        <span className="line-clamp-1 font-medium">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-neutral-600">{p.category}</td>
                    <td className="px-5 py-3 font-semibold">
                      {formatPrice(p.price)}
                    </td>
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
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModal(false)}
          />
          <form
            onSubmit={save}
            className="relative max-h-[90vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-2xl bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {draft.id ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button type="button" onClick={() => setModal(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Fotos */}
            <div>
              <label className="mb-2 block text-sm font-medium">Fotos</label>
              <div className="flex flex-wrap gap-2">
                {draft.images.map((src, i) => (
                  <div
                    key={i}
                    className="relative h-20 w-20 overflow-hidden rounded-lg border border-neutral-200"
                  >
                    <Image
                      src={src}
                      alt={`Foto ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-neutral-300 text-neutral-400 hover:border-brand-orange hover:text-brand-orange"
                >
                  {uploading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Upload size={18} />
                      <span className="text-[10px]">Enviar</span>
                    </>
                  )}
                </button>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleUpload}
                className="hidden"
              />
              <div className="mt-2 flex gap-2">
                <input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="ou cole uma URL de imagem"
                  className={field}
                />
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="flex shrink-0 items-center gap-1 rounded-xl border border-neutral-200 px-3 text-sm font-medium hover:border-brand-orange hover:text-brand-orange"
                >
                  <ImagePlus size={15} /> Add
                </button>
              </div>
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

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Preço</label>
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
                <label className="mb-1 block text-sm font-medium">
                  Preço antigo
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={draft.oldPrice}
                  onChange={(e) =>
                    setDraft({ ...draft, oldPrice: e.target.value })
                  }
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

            <div>
              <label className="mb-1 block text-sm font-medium">Descrição</label>
              <textarea
                rows={3}
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
                className={`${field} resize-none`}
              />
            </div>

            <div className="flex gap-5">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.featured}
                  onChange={(e) =>
                    setDraft({ ...draft, featured: e.target.checked })
                  }
                  className="accent-brand-orange"
                />
                Destaque
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.bestSeller}
                  onChange={(e) =>
                    setDraft({ ...draft, bestSeller: e.target.checked })
                  }
                  className="accent-brand-orange"
                />
                Mais vendido
              </label>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setModal(false)}
                className="btn-outline flex-1"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={saving || uploading}
                className="btn-primary flex-1 disabled:opacity-60"
              >
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
