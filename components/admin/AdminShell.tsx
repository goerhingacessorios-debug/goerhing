"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  Image as ImageIcon,
  ShoppingBag,
  Users,
  Menu,
  X,
  LogOut,
  Search,
  Bell,
} from "lucide-react";
import Logo from "@/components/ui/Logo";

const MENU = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Produtos", href: "/admin/produtos", icon: Package },
  { label: "Categorias", href: "/admin/categorias", icon: Tags },
  { label: "Banners", href: "/admin/banners", icon: ImageIcon },
  { label: "Pedidos", href: "/admin/pedidos", icon: ShoppingBag },
  { label: "Clientes", href: "/admin/clientes", icon: Users },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-brand-black text-neutral-300 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
          <Logo light />
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <nav className="space-y-1 p-3">
          {MENU.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-orange text-white"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 w-full border-t border-white/10 p-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium hover:bg-white/5 hover:text-white"
          >
            <LogOut size={18} /> Voltar à loja
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-neutral-200 bg-white px-4 lg:px-8">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="hidden flex-1 items-center md:flex">
            <div className="flex w-full max-w-md items-center rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2">
              <Search size={16} className="text-neutral-400" />
              <input
                placeholder="Pesquisar no painel..."
                className="ml-2 w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-neutral-100">
              <Bell size={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand-orange" />
            </button>
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange font-bold text-white">
                A
              </span>
              <div className="hidden text-sm sm:block">
                <p className="font-semibold leading-none">Admin</p>
                <p className="text-xs text-neutral-500">Gerente</p>
              </div>
            </div>
          </div>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
