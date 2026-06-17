import Image from "next/image";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

const stats = [
  { label: "Receita do mês", value: formatPrice(184320.5), change: "+12,5%", icon: DollarSign },
  { label: "Pedidos", value: "1.284", change: "+8,2%", icon: ShoppingBag },
  { label: "Produtos", value: String(products.length), change: "+3", icon: Package },
  { label: "Clientes", value: "4.512", change: "+18,9%", icon: Users },
];

const recentOrders = [
  { id: "#10245", client: "João Silva", total: 1299.9, status: "Pago" },
  { id: "#10244", client: "Maria Santos", total: 649.9, status: "Enviado" },
  { id: "#10243", client: "Carlos Lima", total: 289.9, status: "Processando" },
  { id: "#10242", client: "Ana Costa", total: 459.9, status: "Pago" },
  { id: "#10241", client: "Pedro Alves", total: 899.9, status: "Entregue" },
];

const statusColor: Record<string, string> = {
  Pago: "bg-emerald-100 text-emerald-700",
  Enviado: "bg-blue-100 text-blue-700",
  Processando: "bg-amber-100 text-amber-700",
  Entregue: "bg-neutral-200 text-neutral-700",
};

export default function AdminDashboard() {
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
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                <s.icon size={20} />
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <TrendingUp size={13} /> {s.change}
              </span>
            </div>
            <p className="mt-4 text-2xl font-black text-brand-black">{s.value}</p>
            <p className="text-sm text-neutral-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent orders */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-brand-black">Pedidos recentes</h2>
            <a href="/admin/pedidos" className="flex items-center gap-1 text-sm font-semibold text-brand-orange">
              Ver todos <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-left text-xs uppercase text-neutral-400">
                  <th className="pb-3 font-medium">Pedido</th>
                  <th className="pb-3 font-medium">Cliente</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-neutral-50">
                    <td className="py-3 font-semibold">{o.id}</td>
                    <td className="py-3 text-neutral-600">{o.client}</td>
                    <td className="py-3">{formatPrice(o.total)}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[o.status]}`}
                      >
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top products */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-5">
          <h2 className="mb-4 font-bold text-brand-black">Mais vendidos</h2>
          <div className="space-y-3">
            {products.slice(0, 5).map((p) => (
              <div key={p.id} className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                  <Image src={p.images[0]} alt={p.name} fill sizes="48px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-neutral-500">{formatPrice(p.price)}</p>
                </div>
                <span className="text-sm font-semibold text-brand-orange">
                  {p.reviews}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
