import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/data";
import Breadcrumb from "@/components/ui/Breadcrumb";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Artigo não encontrado" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

  return (
    <article className="container-px max-w-3xl py-10 lg:py-14">
      <Breadcrumb
        items={[{ label: "Blog", href: "/blog" }, { label: post.title }]}
      />

      <span className="mt-6 inline-block rounded-full bg-brand-orange/10 px-3 py-1 text-xs font-semibold text-brand-orange">
        {post.category}
      </span>
      <h1 className="mt-3 text-3xl font-black leading-tight text-brand-black sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-neutral-500">
        <span className="flex items-center gap-1.5">
          <User size={15} /> {post.author}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar size={15} /> {post.date}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock size={15} /> {post.readingTime} de leitura
        </span>
      </div>

      <div className="relative mt-6 aspect-video overflow-hidden rounded-2xl">
        <Image src={post.image} alt={post.title} fill priority className="object-cover" />
      </div>

      <div className="prose mt-8 max-w-none space-y-4 leading-relaxed text-neutral-700">
        <p className="text-lg font-medium text-brand-black">{post.excerpt}</p>
        <p>
          Na GOERHING Acessórios, acreditamos que cada detalhe faz a diferença.
          Por isso, reunimos neste artigo as informações mais relevantes para
          ajudar você a tomar a melhor decisão na hora de escolher o seu próximo
          eletrônico.
        </p>
        <p>
          A escolha de produtos de qualidade impacta diretamente no desempenho,
          na durabilidade e na sua experiência de uso. Investir em eletrônicos
          premium garante mais tecnologia, segurança e tranquilidade no dia a dia.
        </p>
        <h2 className="text-xl font-bold text-brand-black">
          O que considerar na hora da compra
        </h2>
        <p>
          Avalie as especificações técnicas, a compatibilidade com os seus
          dispositivos, a reputação da marca e a garantia oferecida. Nossa equipe
          está sempre disponível para tirar dúvidas e recomendar as melhores
          soluções para o seu perfil.
        </p>
        <p>
          Continue acompanhando o blog da GOERHING para mais dicas e novidades do
          universo da tecnologia.
        </p>
      </div>

      <Link href="/blog" className="btn-outline mt-10 w-fit">
        <ArrowLeft size={16} /> Voltar ao blog
      </Link>

      {/* Relacionados */}
      <div className="mt-14">
        <h3 className="mb-5 text-xl font-bold">Leia também</h3>
        <div className="grid gap-5 sm:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.id}
              href={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-2xl border border-neutral-100 bg-white transition-all hover:-translate-y-1 hover:shadow-premium"
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h4 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-brand-orange">
                  {p.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </article>
  );
}
