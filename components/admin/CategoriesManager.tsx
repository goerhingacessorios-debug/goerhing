"use client";

import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { Plus, Pencil, Trash2, X, Loader2 } from "lucide-react";
import { getAllCategories, categoryToRow } from "@/lib/catalog";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import type { Category } from "@/lib/types";
import { slugify } from "@/lib/utils";

const ICON_OPTIONS = [
  "Smartphone",
  "Laptop",
  "Tablet",
  "Headphones",
  "Watch",
  "Gamepad2",
  "Cable",
  "House",
  "Cpu",
  "Camera",
  "Tv",
  "Speaker",
  "Keyboard",
  "Mouse",
  "HardDrive",
  "Battery",
  "Plug",
  "Lightbulb",
  "Monitor",
  "Wifi",
  "Package",
];

type Draft = {
  slug?: string;
  name: string;
  icon: string;
  description: string;
};

const emptyDraft: Draft = { name: "", icon: "Package", description: "" };

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const C =
    (Icons[name as keyof typeof Icons] as React.ComponentType<{
      size?: number;
    }>) || Icons.Package;
  return <C size={size} />;
}

export default function CategoriesManager() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllCategories()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);

  function openNew() {
    setDraft(emptyDraft);
    setEditingSlug(null);
    setModal(true);
  }

  function openEdit(c: Category) {
    setDraft({
      slug: c.slug,
      name: c.name,
      icon: c.icon,
      description: c.description,
    });
    setEditingSlug(c.slug);
    setModal(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!supabaseConfigured || !supabase) {
      alert("Configure o Supabase para salvar categorias.");
      return;
    }
    setSaving(true);
    const slug = editingSlug ?? slugify(draft.name);
    const row = categoryToRow({
      slug,
      name: draft.name,
      icon: draft.icon,
      description: draft.description,
      sort: items.length + 1,
    });

    if (editingSlug) {
      const { error } = await supabase
        .from("categories")
        .update(row)
        .eq("slug", editingSlug);
      if (error) {
        alert("Erro ao salvar: " + error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from("categories").insert(row);
      if (error) {
        alert("Erro ao salvar: " + error.message);
        setSaving(false);
        return;
      }
    }
    setItems(await getAllCategories());
    setSaving(false);
    setModal(false);
  }

  async function remove(slug: string) {
    if (!confirm("Excluir esta categoria?")) return;
    if (!supabase) return;
    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("slug", slug);
    if (error) {
      alert("Erro ao excluir: " + error.message);
      return;
    }
    setItems((prev) => prev.filter((c) => c.slug !== slug));
  }

  const field =
    "w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm outline-none focus:border-brand-orange";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Categorias</h1>
          <p className="text-sm text-neutral-500">
            {items.length} categorias
            {!supabaseConfigured && " (modo demonstração — não salva)"}
          </p>
        </div>
        <button onClick={openNew} className="btn-primary">
          <Plus size={18} /> Nova Categoria
        </button>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 py-20 text-neutral-500">
          <Loader2 className="animate-spin" size={18} /> Carregando...
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cat) => (
            <div
              key={cat.slug}
              className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-white p-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-black text-brand-orange">
                <Icon name={cat.icon} />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-brand-black">{cat.name}</h3>
                <p className="line-clamp-2 text-xs text-neutral-500">
                  {cat.description}
                </p>
                <p className="mt-1 text-xs font-semibold text-brand-orange">
                  {cat.count} produtos
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => openEdit(cat)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-brand-orange"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => remove(cat.slug)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setModal(false)}
          />
          <form
            onSubmit={save}
            className="relative w-full max-w-md space-y-4 rounded-2xl bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">
                {editingSlug ? "Editar Categoria" : "Nova Categoria"}
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
              <label className="mb-2 block text-sm font-medium">Ícone</label>
              <div className="grid grid-cols-7 gap-2">
                {ICON_OPTIONS.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setDraft({ ...draft, icon: name })}
                    className={`flex h-10 w-full items-center justify-center rounded-lg border transition-colors ${
                      draft.icon === name
                        ? "border-brand-orange bg-brand-orange/10 text-brand-orange"
                        : "border-neutral-200 text-neutral-500 hover:border-brand-orange"
                    }`}
                    title={name}
                  >
                    <Icon name={name} size={18} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Descrição</label>
              <textarea
                rows={2}
                value={draft.description}
                onChange={(e) =>
                  setDraft({ ...draft, description: e.target.value })
                }
                className={`${field} resize-none`}
              />
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
                disabled={saving}
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
