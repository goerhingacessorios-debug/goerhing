import Link from "next/link";
import Image from "next/image";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span className="relative flex h-[58px] w-[58px] items-center justify-center transition-transform duration-300 group-hover:scale-105">
        <Image
          src="/logo.png"
          alt="GOERHING Acessórios"
          width={72}
          height={72}
          priority
          className={`h-[58px] w-[58px] object-contain ${light ? "brightness-0 invert" : ""}`}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`text-base font-black tracking-tight ${
            light ? "text-white" : "text-brand-black"
          }`}
        >
          GOERHING
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-orange">
          Acessórios
        </span>
      </span>
    </Link>
  );
}
