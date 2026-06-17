import Image from "next/image";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { heroSlides } from "@/lib/data";

export default function AdminBannersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-brand-black">Banners</h1>
          <p className="text-sm text-neutral-500">
            Gerencie os banners do carrossel da home
          </p>
        </div>
        <button className="btn-primary">
          <Plus size={18} /> Novo Banner
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {heroSlides.map((slide) => (
          <div
            key={slide.id}
            className="overflow-hidden rounded-2xl border border-neutral-100 bg-white"
          >
            <div className="relative h-40">
              <Image src={slide.image} alt={slide.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <p className="text-sm font-bold text-white">{slide.title}</p>
                <p className="line-clamp-1 text-xs text-white/80">{slide.subtitle}</p>
              </div>
              <span className="absolute right-3 top-3 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-semibold text-white">
                Ativo
              </span>
            </div>
            <div className="flex items-center justify-between p-3">
              <span className="text-xs text-neutral-500">CTA: {slide.cta}</span>
              <div className="flex gap-1.5">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100">
                  <Eye size={15} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-brand-orange">
                  <Pencil size={15} />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-red-50 hover:text-red-500">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
