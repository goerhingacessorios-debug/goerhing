import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-px flex min-h-[70vh] flex-col items-center justify-center text-center">
      <span className="text-7xl font-black text-brand-orange sm:text-9xl">404</span>
      <h1 className="mt-4 text-2xl font-bold text-brand-black">
        Página não encontrada
      </h1>
      <p className="mt-2 max-w-md text-neutral-500">
        A página que você procura não existe ou foi movida. Volte para a loja e
        continue explorando.
      </p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-primary">
          <Home size={18} /> Voltar ao início
        </Link>
        <Link href="/produtos" className="btn-outline">
          <Search size={18} /> Ver produtos
        </Link>
      </div>
    </div>
  );
}
