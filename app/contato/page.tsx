import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import ContactForm from "@/components/contact/ContactForm";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Entre em contato com a GOERHING Acessórios. Atendimento por telefone, WhatsApp e e-mail.",
};

const infos = [
  { icon: Phone, label: "Telefone", value: SITE.phone, href: `tel:${SITE.phone}` },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: SITE.whatsappDisplay,
    href: `https://wa.me/${SITE.whatsapp}`,
  },
  { icon: Mail, label: "E-mail", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: MapPin, label: "Endereço", value: SITE.address },
];

export default function ContatoPage() {
  return (
    <div className="container-px py-10 lg:py-14">
      <Breadcrumb items={[{ label: "Contato" }]} />

      <div className="mt-6 text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
          Fale conosco
        </span>
        <h1 className="mt-2 text-3xl font-black text-brand-black sm:text-4xl">
          Entre em Contato
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-neutral-500">
          Tem alguma dúvida ou quer um orçamento? Nossa equipe está pronta para
          atender você.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* Info cards */}
        <div className="space-y-4">
          {infos.map((info) => {
            const Comp = info.href ? "a" : "div";
            return (
              <Comp
                key={info.label}
                {...(info.href
                  ? { href: info.href, target: "_blank", rel: "noreferrer" }
                  : {})}
                className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-white p-5 transition-all hover:shadow-premium"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                  <info.icon size={20} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    {info.label}
                  </p>
                  <p className="mt-0.5 font-semibold text-brand-black">
                    {info.value}
                  </p>
                </div>
              </Comp>
            );
          })}
          <div className="flex items-start gap-4 rounded-2xl bg-brand-black p-5 text-white">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-white">
              <Clock size={20} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Horário
              </p>
              <p className="mt-0.5 text-sm">Seg a Sex: 8h às 18h</p>
              <p className="text-sm">Sáb: 9h às 13h</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-neutral-100 bg-white p-6 lg:col-span-2 lg:p-8">
          <h2 className="mb-5 text-xl font-bold">Envie sua mensagem</h2>
          <ContactForm />
        </div>
      </div>

      {/* Map */}
      <div className="mt-10 overflow-hidden rounded-3xl border border-neutral-100">
        <iframe
          title="Mapa GOERHING"
          src="https://www.google.com/maps?q=Bras%C3%ADlia,+Distrito+Federal&output=embed"
          width="100%"
          height="400"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="border-0"
        />
      </div>
    </div>
  );
}
