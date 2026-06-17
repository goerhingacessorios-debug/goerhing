import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-neutral-500">
      <Link href="/" className="flex items-center gap-1 hover:text-brand-orange">
        <Home size={13} /> Início
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={13} />
          {item.href ? (
            <Link href={item.href} className="hover:text-brand-orange">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-brand-black">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
