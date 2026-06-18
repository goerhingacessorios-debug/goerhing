import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import Logo from "@/components/ui/Logo";
import { SITE } from "@/lib/data";

const COLUMNS = [
  {
    title: "Empresa",
    links: [
      { label: "Sobre Nós", href: "/sobre" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Categorias",
    links: [
      { label: "Produtos", href: "/produtos" },
      { label: "Promoções", href: "/produtos?promo=true" },
      { label: "Novidades", href: "/produtos" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-brand-black text-neutral-400">
      <div className="container-px grid grid-cols-3 gap-x-4 gap-y-8 py-10 md:grid-cols-4 md:gap-10 md:py-14 lg:grid-cols-5">
        <div className="order-last col-span-3 mt-4 border-t border-white/10 pt-6 md:order-none md:col-span-1 md:mt-0 md:border-0 md:pt-0 lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Eletrônicos, celulares e acessórios premium.
            Tecnologia, estilo e desempenho para o seu dia a dia.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: FaWhatsapp, href: `https://wa.me/${SITE.whatsapp}` },
              { icon: FaInstagram, href: SITE.instagram },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-graphite text-white transition-colors hover:bg-brand-orange"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white md:mb-4 md:text-sm">
              {col.title}
            </h4>
            <ul className="space-y-2 text-xs md:space-y-2.5 md:text-sm">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-brand-orange">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white md:mb-4 md:text-sm">
            Atendimento
          </h4>
          <ul className="space-y-2 text-xs md:space-y-3 md:text-sm">
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                className="flex items-center gap-2 transition-colors hover:text-brand-orange"
              >
                <FaWhatsapp size={15} className="shrink-0 text-brand-orange" />
                {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-start gap-2 transition-colors hover:text-brand-orange"
              >
                <Mail size={15} className="mt-0.5 shrink-0 text-brand-orange" />
                <span className="break-all">{SITE.email}</span>
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.phone}`}
                className="flex items-center gap-2 transition-colors hover:text-brand-orange"
              >
                <Phone size={15} className="shrink-0 text-brand-orange" />
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0 text-brand-orange" />
              {SITE.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-px flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos
            reservados.
          </p>
          <div className="flex gap-4">
            <Link href="/sobre" className="hover:text-brand-orange">
              Política de Privacidade
            </Link>
            <Link href="/sobre" className="hover:text-brand-orange">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
