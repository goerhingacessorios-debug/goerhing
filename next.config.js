/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Export estático: gera a pasta "out/" pronta para subir na Hostinger
  output: "export",
  // URLs com barra final geram /pagina/index.html — servem direto no Apache/LiteSpeed
  trailingSlash: true,
  images: {
    // Necessário no export estático (não há servidor para otimizar imagens)
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
};

module.exports = nextConfig;
