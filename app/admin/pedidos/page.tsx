import { ShoppingBag } from "lucide-react";

export default function AdminPedidosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-black">Pedidos</h1>
        <p className="text-sm text-neutral-500">Gerencie os pedidos da loja</p>
      </div>

      <div className="rounded-2xl border border-neutral-100 bg-white">
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <ShoppingBag size={40} className="text-neutral-300" />
          <p className="text-sm text-neutral-500">
            Nenhum pedido ainda. Os pedidos dos clientes aparecerão aqui.
          </p>
        </div>
      </div>
    </div>
  );
}
