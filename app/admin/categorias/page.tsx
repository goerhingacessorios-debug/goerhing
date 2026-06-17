import * as Icons from "lucide-react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { categories } from "@/lib/data";

export default function AdminCategoriasPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Categorias</h1>
          <p className="text-sm text-neutral-500">
            {categories.length} categorias cadastradas
          </p>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> Nova Categoria
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => {
          const Icon =
            (Icons[cat.icon as keyof typeof Icons] as React.ComponentType<{
              size?: number;
            }>) || Icons.Package;
          return (
            <div
              key={cat.slug}
              className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-white p-5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-black text-brand-orange">
                <Icon size={22} />
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
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-brand-orange">
                  <Pencil size={15} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-red-50 hover:text-red-500">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
