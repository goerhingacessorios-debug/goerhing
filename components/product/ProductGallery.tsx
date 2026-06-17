"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row-reverse">
      <div
        ref={ref}
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={onMove}
        className="relative aspect-square flex-1 cursor-zoom-in overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50"
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-200"
          style={
            zoom
              ? {
                  transform: "scale(1.8)",
                  transformOrigin: `${pos.x}% ${pos.y}%`,
                }
              : undefined
          }
        />
        <span className="pointer-events-none absolute bottom-3 right-3 hidden rounded-full bg-brand-black/70 px-3 py-1 text-[11px] text-white sm:block">
          Passe o mouse para ampliar
        </span>
      </div>

      <div className="flex gap-3 lg:flex-col">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative h-20 w-20 overflow-hidden rounded-xl border-2 transition-colors ${
              active === i ? "border-brand-orange" : "border-neutral-200"
            }`}
          >
            <Image
              src={src}
              alt={`${alt} ${i + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
