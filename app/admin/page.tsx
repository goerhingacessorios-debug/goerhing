"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  Plus,
} from "lucide-react";
import { getAllProducts } from "@/lib/catalog";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Receita", value: formatPrice(0), icon: DollarSign },
    { label: "Pedidos", value: "0", icon: ShoppingBag },
    { label: "Produtos", value: loading ? "—" : String(products.length), icon: Package },
    { label: "Clientes", value: "0", icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-black">Dashboard</h1>
        <p className="text-sm text-neutral-500">
          Visão geral da loja GOERHING Acessórios
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-neutral-100 bg-white p-5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
              <s.icon size={20} />
            </span>
            <p className="mt-4 text-2xl font-black text-brand-black">{s.value}</p>
            <p className="text-sm text-neutral-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Pedidos */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 font-bold text-brand-black">Pedidos recentes</h2>
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <ShoppingBag size={36} className="text-neutral-300" />
            <p className="text-sm text-neutral-500">
              Nenhum pedido ainda. Os pedidos aparecerão aqui conforme as vendas
              acontecerem.
            </p>
          </div>
        </div>

        {/* Produtos recentes */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-brand-black">Produtos recentes</h2>
            <Link
              href="/admin/produtos"
              className="flex items-center gap-1 text-sm font-semibold text-brand-orange"
            >
              <Plus size={15} /> Gerenciar
            </Link>
          </div>
          {loading ? (
            <p className="py-8 text-center text-sm text-neutral-400">
              Carregando...
            </p>
          ) : products.length === 0 ? (
            <p className="py-8 text-center text-sm text-neutral-500">
              Nenhum produto cadastrado.
            </p>
          ) : (
            <div className="space-y-3">
              {products.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    {p.images[0] && (
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-neutral-500">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
