import type { Product, Category, BlogPost } from "./types";

// Imagem placeholder profissional (Unsplash) — tema eletrônicos / tecnologia
const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=80`;

export const categories: Category[] = [
  {
    slug: "smartphones",
    name: "Smartphones",
    icon: "Smartphone",
    description: "Celulares de última geração das melhores marcas.",
    count: 48,
  },
  {
    slug: "notebooks",
    name: "Notebooks",
    icon: "Laptop",
    description: "Notebooks para trabalho, estudo e games.",
    count: 32,
  },
  {
    slug: "tablets",
    name: "Tablets",
    icon: "Tablet",
    description: "Tablets potentes para produtividade e lazer.",
    count: 21,
  },
  {
    slug: "audio",
    name: "Áudio",
    icon: "Headphones",
    description: "Fones, caixas de som e áudio de alta fidelidade.",
    count: 57,
  },
  {
    slug: "smartwatches",
    name: "Smartwatches",
    icon: "Watch",
    description: "Relógios inteligentes para saúde e produtividade.",
    count: 29,
  },
  {
    slug: "games",
    name: "Games",
    icon: "Gamepad2",
    description: "Consoles, controles e periféricos gamer.",
    count: 44,
  },
  {
    slug: "acessorios",
    name: "Acessórios",
    icon: "Cable",
    description: "Carregadores, cabos, capas e power banks.",
    count: 73,
  },
  {
    slug: "casa-inteligente",
    name: "Casa Inteligente",
    icon: "House",
    description: "Lâmpadas, tomadas e dispositivos smart home.",
    count: 38,
  },
];

function buildProducts(): Product[] {
  const base: (Omit<Product, "id" | "slug" | "images"> & { seeds: string[] })[] = [
    {
      name: "Smartphone Pro Max 256GB 5G",
      category: "Smartphones",
      categorySlug: "smartphones",
      price: 5499.9,
      oldPrice: 6999.9,
      rating: 4.9,
      reviews: 412,
      description:
        "Smartphone topo de linha com tela OLED de 6,7 polegadas 120Hz, processador de última geração, 256GB de armazenamento e sistema de câmera tripla com sensor de 50MP. Bateria para o dia inteiro com carregamento rápido.",
      specs: [
        { label: "Tela", value: '6,7" OLED 120Hz' },
        { label: "Armazenamento", value: "256GB" },
        { label: "Câmera", value: "Tripla 50MP" },
        { label: "Conexão", value: "5G / Wi-Fi 6E" },
      ],
      badge: "Mais Vendido",
      stock: 28,
      featured: true,
      bestSeller: true,
      seeds: [
        "photo-1511707171634-5f897ff02aa9",
        "photo-1510557880182-3d4d3cba35a5",
        "photo-1592899677977-9c10ca588bbd",
      ],
    },
    {
      name: "Notebook Ultra 15'' Core i7 16GB SSD 512GB",
      category: "Notebooks",
      categorySlug: "notebooks",
      price: 4799.9,
      oldPrice: 5999.9,
      rating: 4.8,
      reviews: 256,
      description:
        "Notebook fino e leve com processador Core i7, 16GB de RAM e SSD NVMe de 512GB. Tela Full HD IPS antirreflexo, teclado retroiluminado e bateria de longa duração. Ideal para trabalho e multitarefa.",
      specs: [
        { label: "Processador", value: "Core i7" },
        { label: "Memória", value: "16GB RAM" },
        { label: "Armazenamento", value: "SSD 512GB" },
        { label: "Tela", value: '15,6" Full HD IPS' },
      ],
      badge: "Promoção",
      stock: 15,
      featured: true,
      bestSeller: true,
      seeds: [
        "photo-1496181133206-80ce9b88a853",
        "photo-1517336714731-489689fd1ca8",
        "photo-1531297484001-80022131f5a1",
      ],
    },
    {
      name: "Fone Bluetooth ANC com Cancelamento de Ruído",
      category: "Áudio",
      categorySlug: "audio",
      price: 899.9,
      oldPrice: 1299.9,
      rating: 4.9,
      reviews: 534,
      description:
        "Headphone over-ear com cancelamento ativo de ruído (ANC), drivers de 40mm e som hi-res. Até 35 horas de bateria, conexão Bluetooth 5.3 multiponto e conforto premium para uso prolongado.",
      specs: [
        { label: "Tipo", value: "Over-ear ANC" },
        { label: "Bateria", value: "35 horas" },
        { label: "Conexão", value: "Bluetooth 5.3" },
        { label: "Drivers", value: "40mm Hi-Res" },
      ],
      badge: "Mais Vendido",
      stock: 60,
      featured: true,
      bestSeller: true,
      seeds: [
        "photo-1505740420928-5e560c06d30e",
        "photo-1484704849700-f032a568e944",
        "photo-1546435770-a3e426bf472b",
      ],
    },
    {
      name: "Smartwatch Series X GPS Tela AMOLED",
      category: "Smartwatches",
      categorySlug: "smartwatches",
      price: 1299.9,
      oldPrice: 1799.9,
      rating: 4.7,
      reviews: 298,
      description:
        "Relógio inteligente com tela AMOLED sempre ativa, GPS integrado, monitor de frequência cardíaca, oximetria e mais de 100 modos esportivos. Resistente à água e com até 7 dias de bateria.",
      specs: [
        { label: "Tela", value: "AMOLED Always-On" },
        { label: "GPS", value: "Integrado" },
        { label: "Bateria", value: "Até 7 dias" },
        { label: "Resistência", value: "5 ATM" },
      ],
      badge: "Novo",
      stock: 34,
      featured: true,
      bestSeller: true,
      seeds: [
        "photo-1523275335684-37898b6baf30",
        "photo-1546868871-7041f2a55e12",
        "photo-1579586337278-3befd40fd17a",
      ],
    },
    {
      name: "Console Next-Gen 1TB Edição Digital",
      category: "Games",
      categorySlug: "games",
      price: 3799.9,
      oldPrice: 4499.9,
      rating: 4.9,
      reviews: 187,
      description:
        "Console de nova geração com SSD ultrarrápido de 1TB, gráficos em 4K a 120fps e ray tracing. Carregamentos instantâneos e biblioteca de jogos imersiva para a melhor experiência gamer.",
      specs: [
        { label: "Armazenamento", value: "SSD 1TB" },
        { label: "Resolução", value: "4K 120fps" },
        { label: "Recursos", value: "Ray Tracing" },
        { label: "Conexão", value: "Wi-Fi 6 / HDMI 2.1" },
      ],
      badge: "Mais Vendido",
      stock: 12,
      featured: true,
      bestSeller: true,
      seeds: [
        "photo-1606144042614-b2417e99c4e3",
        "photo-1612831455359-970e23a1e4e9",
        "photo-1607853202273-797f1c22a38e",
      ],
    },
    {
      name: "Caixa de Som Bluetooth 60W à Prova d'Água",
      category: "Áudio",
      categorySlug: "audio",
      price: 649.9,
      oldPrice: 899.9,
      rating: 4.6,
      reviews: 221,
      description:
        "Caixa de som portátil com 60W de potência, graves profundos e classificação IP67 contra água e poeira. Até 24 horas de reprodução e pareamento estéreo entre duas unidades.",
      specs: [
        { label: "Potência", value: "60W RMS" },
        { label: "Proteção", value: "IP67" },
        { label: "Bateria", value: "24 horas" },
        { label: "Conexão", value: "Bluetooth 5.3" },
      ],
      badge: "Promoção",
      stock: 45,
      featured: true,
      bestSeller: false,
      seeds: [
        "photo-1608043152269-423dbba4e7e1",
        "photo-1545454675-3531b543be5d",
        "photo-1589003077984-894e133dabab",
      ],
    },
    {
      name: "Tablet Pro 11'' 128GB Wi-Fi com Caneta",
      category: "Tablets",
      categorySlug: "tablets",
      price: 2799.9,
      oldPrice: 3499.9,
      rating: 4.8,
      reviews: 164,
      description:
        "Tablet com tela de 11 polegadas 120Hz, 128GB de armazenamento e suporte à caneta digital. Perfeito para anotações, desenho e produtividade, com alto-falantes estéreo e bateria de longa duração.",
      specs: [
        { label: "Tela", value: '11" 120Hz' },
        { label: "Armazenamento", value: "128GB" },
        { label: "Caneta", value: "Inclusa" },
        { label: "Conexão", value: "Wi-Fi 6" },
      ],
      badge: "Novo",
      stock: 22,
      featured: true,
      bestSeller: true,
      seeds: [
        "photo-1544244015-0df4b3ffc6b0",
        "photo-1561154464-82e9adf32764",
        "photo-1585790050230-5dd28404ccb9",
      ],
    },
    {
      name: "Carregador Turbo GaN 65W USB-C",
      category: "Acessórios",
      categorySlug: "acessorios",
      price: 199.9,
      oldPrice: 299.9,
      rating: 4.8,
      reviews: 489,
      description:
        "Carregador compacto com tecnologia GaN e 65W de potência. Carrega notebooks, tablets e smartphones com carregamento rápido. Duas portas USB-C e uma USB-A para múltiplos dispositivos.",
      specs: [
        { label: "Potência", value: "65W" },
        { label: "Tecnologia", value: "GaN" },
        { label: "Portas", value: "2x USB-C + USB-A" },
        { label: "Protocolos", value: "PD 3.0 / QC 4.0" },
      ],
      badge: "Mais Vendido",
      stock: 110,
      featured: true,
      bestSeller: true,
      seeds: [
        "photo-1583863788434-e58a36330cf0",
        "photo-1591290619762-bb4eca20a3a3",
        "photo-1572569511254-d8f925fe2cbb",
      ],
    },
    {
      name: "Smartphone Lite 128GB Dual SIM",
      category: "Smartphones",
      categorySlug: "smartphones",
      price: 1899.9,
      oldPrice: 2399.9,
      rating: 4.6,
      reviews: 342,
      description:
        "Smartphone intermediário com excelente custo-benefício: tela de 6,5 polegadas, 128GB de armazenamento, bateria de 5000mAh e câmera dupla de 48MP. Desempenho fluido para o dia a dia.",
      specs: [
        { label: "Tela", value: '6,5" 90Hz' },
        { label: "Armazenamento", value: "128GB" },
        { label: "Bateria", value: "5000mAh" },
        { label: "Câmera", value: "Dupla 48MP" },
      ],
      stock: 56,
      featured: false,
      bestSeller: true,
      seeds: [
        "photo-1592750475338-74b7b21085ab",
        "photo-1565849904461-04a58ad377e0",
        "photo-1601784551446-20c9e07cdbdb",
      ],
    },
    {
      name: "Mouse Gamer Sem Fio RGB 26000 DPI",
      category: "Games",
      categorySlug: "games",
      price: 349.9,
      oldPrice: 499.9,
      rating: 4.7,
      reviews: 276,
      description:
        "Mouse gamer sem fio ultraleve com sensor de 26000 DPI, switches ópticos e iluminação RGB. Latência mínima, até 90 horas de bateria e design ergonômico para sessões intensas.",
      specs: [
        { label: "Sensor", value: "26000 DPI" },
        { label: "Conexão", value: "2.4GHz / Bluetooth" },
        { label: "Bateria", value: "90 horas" },
        { label: "Iluminação", value: "RGB" },
      ],
      badge: "Promoção",
      stock: 70,
      featured: false,
      bestSeller: true,
      seeds: [
        "photo-1527814050087-3793815479db",
        "photo-1615663245857-ac93bb7c39e7",
        "photo-1618384887929-16ec33fab9ef",
      ],
    },
    {
      name: "Lâmpada Inteligente Wi-Fi RGB (Kit 2)",
      category: "Casa Inteligente",
      categorySlug: "casa-inteligente",
      price: 129.9,
      oldPrice: 199.9,
      rating: 4.5,
      reviews: 198,
      description:
        "Kit com 2 lâmpadas inteligentes Wi-Fi com 16 milhões de cores, controle por aplicativo e assistente de voz. Crie cenas, rotinas e ambientes personalizados sem precisar de hub.",
      specs: [
        { label: "Cores", value: "16 milhões (RGB)" },
        { label: "Controle", value: "App + Voz" },
        { label: "Conexão", value: "Wi-Fi 2.4GHz" },
        { label: "Compatível", value: "Alexa / Google" },
      ],
      badge: "Novo",
      stock: 95,
      featured: false,
      bestSeller: false,
      seeds: [
        "photo-1558002038-1055907df827",
        "photo-1565814329452-e1efa11c5b89",
        "photo-1567789884554-0b2b3d9b8a5c",
      ],
    },
    {
      name: "Power Bank 20000mAh 22.5W Carga Rápida",
      category: "Acessórios",
      categorySlug: "acessorios",
      price: 159.9,
      oldPrice: 229.9,
      rating: 4.7,
      reviews: 367,
      description:
        "Carregador portátil de 20000mAh com carregamento rápido de 22.5W, display digital de bateria e múltiplas saídas. Carrega smartphones várias vezes e tablets com agilidade.",
      specs: [
        { label: "Capacidade", value: "20000mAh" },
        { label: "Potência", value: "22.5W" },
        { label: "Portas", value: "2x USB-A + USB-C" },
        { label: "Display", value: "Digital" },
      ],
      stock: 120,
      featured: false,
      bestSeller: false,
      seeds: [
        "photo-1609091839311-d5365f9ff1c5",
        "photo-1583394838336-acd977736f90",
        "photo-1622445275576-721325763afe",
      ],
    },
  ];

  return base.map((p, i) => {
    const { seeds, ...rest } = p;
    const slug = p.name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return {
      ...rest,
      id: String(i + 1),
      slug,
      images: seeds.map(img),
    };
  });
}

export const products: Product[] = buildProducts();

export const featuredProducts = products.filter((p) => p.featured);
export const bestSellers = products.filter((p) => p.bestSeller);

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .concat(products.filter((p) => p.categorySlug !== product.categorySlug))
    .slice(0, limit);
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "como-escolher-smartphone-2026",
    title: "Como escolher o smartphone ideal em 2026",
    excerpt:
      "Tela, câmera, bateria e processador: entenda o que realmente importa na hora de comprar o seu próximo celular.",
    category: "Smartphones",
    author: "Equipe GOERHING",
    date: "12 Jun 2026",
    readingTime: "6 min",
    image: img("photo-1511707171634-5f897ff02aa9"),
  },
  {
    id: "2",
    slug: "fones-cancelamento-ruido-vale-a-pena",
    title: "Fones com cancelamento de ruído: vale a pena?",
    excerpt:
      "Descubra como a tecnologia ANC transforma sua experiência sonora e em quais situações ela faz diferença.",
    category: "Áudio",
    author: "Equipe GOERHING",
    date: "05 Jun 2026",
    readingTime: "4 min",
    image: img("photo-1505740420928-5e560c06d30e"),
  },
  {
    id: "3",
    slug: "notebook-trabalho-ou-games",
    title: "Notebook para trabalho ou games: qual escolher?",
    excerpt:
      "Compare processador, placa de vídeo e tela para encontrar o notebook perfeito para o seu perfil.",
    category: "Notebooks",
    author: "Equipe GOERHING",
    date: "28 Mai 2026",
    readingTime: "5 min",
    image: img("photo-1496181133206-80ce9b88a853"),
  },
  {
    id: "4",
    slug: "smartwatch-saude-produtividade",
    title: "Smartwatch: saúde e produtividade no seu pulso",
    excerpt:
      "Veja como os relógios inteligentes ajudam no monitoramento da saúde e na organização do dia a dia.",
    category: "Smartwatches",
    author: "Equipe GOERHING",
    date: "20 Mai 2026",
    readingTime: "7 min",
    image: img("photo-1523275335684-37898b6baf30"),
  },
  {
    id: "5",
    slug: "casa-inteligente-por-onde-comecar",
    title: "Casa inteligente: por onde começar",
    excerpt:
      "Lâmpadas, tomadas e assistentes de voz: um guia simples para automatizar a sua casa sem complicação.",
    category: "Casa Inteligente",
    author: "Equipe GOERHING",
    date: "14 Mai 2026",
    readingTime: "5 min",
    image: img("photo-1558002038-1055907df827"),
  },
  {
    id: "6",
    slug: "acessorios-essenciais-celular",
    title: "5 acessórios essenciais para o seu celular",
    excerpt:
      "Do carregador turbo ao power bank: conheça os itens que potencializam o uso do seu smartphone.",
    category: "Acessórios",
    author: "Equipe GOERHING",
    date: "08 Mai 2026",
    readingTime: "6 min",
    image: img("photo-1583863788434-e58a36330cf0"),
  },
];

export const heroSlides = [
  {
    id: 1,
    title: "Eletrônicos Premium",
    subtitle:
      "As melhores marcas em smartphones, notebooks e gadgets com tecnologia de ponta.",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1920&q=80",
    cta: "Comprar Agora",
    href: "/produtos",
  },
  {
    id: 2,
    title: "Smartphones de Última Geração",
    subtitle:
      "Celulares poderosos com câmeras incríveis, 5G e performance de sobra.",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1920&q=80",
    cta: "Ver Smartphones",
    href: "/produtos?categoria=smartphones",
  },
  {
    id: 3,
    title: "Ofertas Especiais",
    subtitle:
      "Descontos exclusivos de até 40% nos melhores eletrônicos e acessórios.",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1920&q=80",
    cta: "Ver Ofertas",
    href: "/produtos?promo=true",
  },
];

export const SITE = {
  name: "GOERHING ACESSÓRIOS",
  phone: "(61) 99138-0176",
  whatsapp: "5561991380176",
  whatsappDisplay: "(61) 99138-0176",
  email: "contato@goerhing.com.br",
  address: "Brasília, Distrito Federal",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  youtube: "https://youtube.com",
};
