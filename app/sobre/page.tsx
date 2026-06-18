import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Target, Eye, Heart, Award, Truck, Users, Package, Smile } from "lucide-react";
import CountUp from "@/components/ui/CountUp";
import Breadcrumb from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Conheça a história da GOERHING Acessórios, nossa missão, valores e diferenciais no mercado de eletrônicos, celulares e acessórios premium.",
};

const values = [
  { icon: Award, title: "Qualidade", text: "Produtos selecionados das melhores marcas." },
  { icon: Heart, title: "Paixão", text: "Amor por tecnologia e inovação em cada detalhe." },
  { icon: Users, title: "Confiança", text: "Relacionamento transparente com o cliente." },
  { icon: Truck, title: "Agilidade", text: "Entregas rápidas e atendimento eficiente." },
];

const stats = [
  { icon: Smile, end: 500, suffix: "+", label: "Clientes satisfeitos" },
  { icon: Package, end: 600, suffix: "+", label: "Produtos vendidos" },
  { icon: Award, end: 3, suffix: " anos", label: "De experiência" },
  { icon: Users, end: 98, suffix: "%", label: "Avaliações positivas" },
];

export default function SobrePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-80 overflow-hidden bg-brand-black">
        <Image
          src="https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1920&q=80"
          alt="Sobre a GOERHING"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="container-px relative flex h-full flex-col justify-center">
          <Breadcrumb items={[{ label: "Sobre Nós" }]} />
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">
            Sobre a GOERHING
          </h1>
          <p className="mt-3 max-w-xl text-neutral-200">
            Há mais de 3 anos conectando pessoas à melhor tecnologia, com
            eletrônicos premium, inovação e desempenho.
          </p>
        </div>
      </section>

      {/* História */}
      <section className="container-px grid items-center gap-10 py-16 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
            alt="Nossa história"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            Nossa história
          </span>
          <h2 className="section-title mt-2">
            Paixão por tecnologia, compromisso com a excelência
          </h2>
          <p className="mt-4 leading-relaxed text-neutral-600">
            A GOERHING Acessórios nasceu da paixão por tecnologia e inovação,
            atendendo milhares de clientes em todo o Brasil.
          </p>
          <p className="mt-3 leading-relaxed text-neutral-600">
            Trabalhamos apenas com produtos de alta qualidade, selecionando marcas
            reconhecidas e garantindo a melhor experiência de compra. Nosso
            objetivo é simples: levar a melhor tecnologia até você com estilo,
            inovação e desempenho.
          </p>
          <Link href="/produtos" className="btn-primary mt-6">
            Conheça nossos produtos
          </Link>
        </div>
      </section>

      {/* Missão / Visão / Valores */}
      <section className="bg-white py-16">
        <div className="container-px grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-gradient-to-br from-brand-black to-brand-graphite p-8 text-white">
            <Target size={32} className="text-brand-orange" />
            <h3 className="mt-4 text-xl font-bold">Missão</h3>
            <p className="mt-2 text-neutral-300">
              Oferecer eletrônicos e acessórios premium que combinem qualidade,
              tecnologia e design, superando as expectativas dos nossos clientes.
            </p>
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-brand-orange to-brand-orange-dark p-8 text-white">
            <Eye size={32} className="text-white" />
            <h3 className="mt-4 text-xl font-bold">Visão</h3>
            <p className="mt-2 text-white/90">
              Ser a marca de referência em eletrônicos e celulares no Brasil,
              reconhecida pela excelência e inovação.
            </p>
          </div>
        </div>

        <div className="container-px mt-10">
          <h3 className="mb-6 text-center text-2xl font-bold">Nossos Valores</h3>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 text-center transition-all hover:-translate-y-1 hover:shadow-premium"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-black text-brand-orange">
                  <v.icon size={26} />
                </span>
                <h4 className="mt-4 font-bold text-brand-black">{v.title}</h4>
                <p className="mt-1 text-sm text-neutral-500">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="bg-brand-black py-16">
        <div className="container-px grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <s.icon size={28} className="mx-auto text-brand-orange" />
              <div className="mt-3 text-4xl font-black text-white">
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              <p className="mt-1 text-sm text-neutral-400">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
