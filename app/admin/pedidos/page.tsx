import { Eye } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const orders = [
  { id: "#10245", client: "João Silva", date: "16/06/2026", items: 2, total: 1949.8, status: "Pago" },
  { id: "#10244", client: "Maria Santos", date: "15/06/2026", items: 1, total: 649.9, status: "Enviado" },
  { id: "#10243", client: "Carlos Lima", date: "15/06/2026", items: 3, total: 1039.7, status: "Processando" },
  { id: "#10242", client: "Ana Costa", date: "14/06/2026", items: 1, total: 459.9, status: "Pago" },
  { id: "#10241", client: "Pedro Alves", date: "13/06/2026", items: 2, total: 1199.8, status: "Entregue" },
  { id: "#10240", client: "Júlia Rocha", date: "12/06/2026", items: 1, total: 199.9, status: "Cancelado" },
];

const statusColor: Record<string, string> = {
  Pago: "bg-emerald-100 text-emerald-700",
  Enviado: "bg-blue-100 text-blue-700",
  Processando: "bg-amber-100 text-amber-700",
  Entregue: "bg-neutral-200 text-neutral-700",
  Cancelado: "bg-red-100 text-red-700",
};

export default function AdminPedidosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-black">Pedidos</h1>
        <p className="text-sm text-neutral-500">Gerencie os pedidos da loja</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50 text-left text-xs uppercase text-neutral-400">
                <th className="px-5 py-3 font-medium">Pedido</th>
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">Data</th>
                <th className="px-5 py-3 font-medium">Itens</th>
                <th className="px-5 py-3 font-medium">Total</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-neutral-50 hover:bg-neutral-50">
                  <td className="px-5 py-3 font-semibold">{o.id}</td>
                  <td className="px-5 py-3 text-neutral-600">{o.client}</td>
                  <td className="px-5 py-3 text-neutral-500">{o.date}</td>
                  <td className="px-5 py-3">{o.items}</td>
                  <td className="px-5 py-3 font-semibold">{formatPrice(o.total)}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[o.status]}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-brand-orange">
                        <Eye size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
