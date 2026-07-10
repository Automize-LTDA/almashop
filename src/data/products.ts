export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[]; // [0] flat, [1] on model (or alternative view)
  colors: string[];
  sizes: string[];
  badge?: 'NEW' | 'SOLD OUT';
  description: string;
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
    description: 'Camiseta oversized premium de alta gramatura (240gsm). Modelagem quadrada e caimento estruturado.'
  },
  {
    id: '2',
    name: 'ESSENTIAL CHARCOAL HOODIE',
    price: 349.90,
    images: ['/images/product_hoodie.jpg', '/images/hero_streetwear.jpg'],
    colors: ['#2a2a2a'],
    sizes: ['P', 'M', 'G', 'GG'],
    badge: 'NEW',
    description: 'Moletom canguru em algodão premium com interior peluciado. Caimento super oversized.'
  },
  {
    id: '3',
    name: 'TACTICAL CARGO PANTS',
    price: 429.90,
    images: ['/images/product_pants.jpg', '/images/hero_streetwear.jpg'],
    colors: ['#050505'],
    sizes: ['P', 'M', 'G', 'GG'],
    description: 'Calça cargo com zíperes metálicos e bolsos utilitários 3D. Tecido ripstop resistente.'
  }
];
