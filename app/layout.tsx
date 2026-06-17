import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import SiteChrome from "@/components/layout/SiteChrome";
import { SITE } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goerhing-acessorios.vercel.app"),
  title: {
    default: `${SITE.name} — Eletrônicos, Celulares e Acessórios`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Loja premium de eletrônicos, celulares e acessórios. Smartphones, notebooks, tablets, áudio, smartwatches, games e muito mais com entrega rápida e compra segura.",
  keywords: [
    "eletrônicos",
    "celulares",
    "smartphones",
    "notebooks",
    "fones de ouvido",
    "smartwatch",
    "acessórios",
    "GOERHING",
  ],
  authors: [{ name: SITE.name }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: `${SITE.name} — Eletrônicos, Celulares e Acessórios`,
    description:
      "Eletrônicos e celulares premium com tecnologia, estilo e desempenho.",
    type: "website",
    locale: "pt_BR",
    siteName: SITE.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="min-h-screen bg-neutral-50 font-sans antialiased">
        <StoreProvider>
          <SiteChrome>{children}</SiteChrome>
        </StoreProvider>
      </body>
    </html>
  );
}
