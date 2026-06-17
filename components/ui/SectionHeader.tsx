import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = "Ver todos",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <span className="text-sm font-semibold uppercase tracking-widest text-brand-orange">
            {eyebrow}
          </span>
        )}
        <h2 className="section-title mt-1">{title}</h2>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-neutral-500">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-black transition-colors hover:text-brand-orange sm:flex"
        >
          {hrefLabel}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
