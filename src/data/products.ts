export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[]; // [0] flat, [1] on model (or alternative view)
  colors: string[];
  sizes: string[];
  badge?: 'NEW' | 'SOLD OUT';
  description: string;
  category: 'tshirts' | 'hoodies' | 'pants' | 'shoes' | 'accessories';
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'HEAVYWEIGHT OVERSIZED TEE',
    price: 189.90,
    images: ['/images/product_tshirt.jpg', '/images/hero_streetwear.jpg'],
    colors: ['#050505'],
    sizes: ['P', 'M', 'G', 'GG'],
    badge: 'NEW',
    description: 'Camiseta oversized premium de alta gramatura (240gsm). Modelagem quadrada e caimento estruturado.',
    category: 'tshirts'
  },
  {
    id: '2',
    name: 'ESSENTIAL CHARCOAL HOODIE',
    price: 349.90,
    images: ['/images/product_hoodie.jpg', '/images/hero_streetwear.jpg'],
    colors: ['#2a2a2a'],
    sizes: ['P', 'M', 'G', 'GG'],
    badge: 'NEW',
    description: 'Moletom canguru em algodão premium com interior peluciado. Caimento super oversized.',
    category: 'hoodies'
  },
  {
    id: '3',
    name: 'TACTICAL CARGO PANTS',
    price: 429.90,
    images: ['/images/product_pants.jpg', '/images/hero_streetwear.jpg'],
    colors: ['#050505'],
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Calça cargo com zíperes metálicos e bolsos utilitários 3D. Tecido ripstop resistente.',
    category: 'pants'
  },
  {
    id: '4',
    name: 'DISTRESSED WIDE DENIM',
    price: 489.90,
    images: ['/images/product_denim.jpg', '/images/hero_streetwear.jpg'],
    colors: ['#1e1e1e'],
    sizes: ['38', '40', '42', '44'],
    badge: 'NEW',
    description: 'Calça jeans modelagem wide fit com detalhes destroyed artesanais e lavagem vintage estonada.',
    category: 'pants'
  },
  {
    id: '5',
    name: 'CHUNKY RUNNER SNEAKERS',
    price: 689.90,
    images: ['/images/product_sneakers.jpg', '/images/hero_streetwear.jpg'],
    colors: ['#050505', '#ffffff'],
    sizes: ['38', '39', '40', '41', '42', '43'],
    badge: 'NEW',
    description: 'Tênis chunky de solado tridimensional e cabedal robusto em couro e mesh respirável.',
    category: 'shoes'
  },
  {
    id: '6',
    name: 'TACTICAL UTILITY BOOTS',
    price: 799.90,
    images: ['/images/product_boots.jpg', '/images/hero_streetwear.jpg'],
    colors: ['#0d0d0d'],
    sizes: ['39', '40', '41', '42', '43', '44'],
    description: 'Bota tática militar com zíper rápido de abertura, solado tratorado Vibram e tecido balístico.',
    category: 'shoes'
  }
];
