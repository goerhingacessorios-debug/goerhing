import { Mail, Eye } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const customers = [
  { name: "João Silva", email: "joao@email.com", orders: 8, spent: 4520.5, since: "2024" },
  { name: "Maria Santos", email: "maria@email.com", orders: 12, spent: 7890.0, since: "2023" },
  { name: "Carlos Lima", email: "carlos@email.com", orders: 3, spent: 1290.7, since: "2025" },
  { name: "Ana Costa", email: "ana@email.com", orders: 5, spent: 2310.9, since: "2024" },
  { name: "Pedro Alves", email: "pedro@email.com", orders: 15, spent: 11240.3, since: "2022" },
  { name: "Júlia Rocha", email: "julia@email.com", orders: 1, spent: 199.9, since: "2026" },
];

export default function AdminClientesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-black">Clientes</h1>
        <p className="text-sm text-neutral-500">
          {customers.length} clientes cadastrados
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50 text-left text-xs uppercase text-neutral-400">
                <th className="px-5 py-3 font-medium">Cliente</th>
                <th className="px-5 py-3 font-medium">E-mail</th>
                <th className="px-5 py-3 font-medium">Pedidos</th>
                <th className="px-5 py-3 font-medium">Total gasto</th>
                <th className="px-5 py-3 font-medium">Cliente desde</th>
                <th className="px-5 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.email} className="border-b border-neutral-50 hover:bg-neutral-50">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange/10 font-bold text-brand-orange">
                        {c.name.charAt(0)}
                      </span>
                      <span className="font-medium">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-neutral-600">{c.email}</td>
                  <td className="px-5 py-3">{c.orders}</td>
                  <td className="px-5 py-3 font-semibold">{formatPrice(c.spent)}</td>
                  <td className="px-5 py-3 text-neutral-500">{c.since}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2">
                      <a
                        href={`mailto:${c.email}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 hover:text-brand-orange"
                      >
                        <Mail size={15} />
                      </a>
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
