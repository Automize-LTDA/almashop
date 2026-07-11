export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[]; // [0] flat, [1] on model (or alternative view)
  colors: string[];
  badge?: 'NEW' | 'SOLD OUT';
  description: string;
  category: 'tshirts' | 'hoodies' | 'pants' | 'shoes' | 'accessories';
  originalPrice?: number;
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
    category: 'tshirts',
    originalPrice: 249.90
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
    category: 'hoodies',
    originalPrice: 429.90
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
    category: 'pants',
    originalPrice: 589.90
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
  },
  {
    id: '7',
    name: 'TACTICAL RIBBED BEANIE',
    price: 99.90,
    images: ['/images/product_beanie.jpg', '/images/hero_streetwear.jpg'],
    colors: ['#050505'],
    sizes: ['U'],
    badge: 'NEW',
    description: 'Touca beanie canelada em malha pesada com etiqueta bordada de alta densidade.',
    category: 'accessories',
    originalPrice: 149.90
  },
  {
    id: 'cap-1',
    name: 'ASTROS GALAXY CAP',
    price: 149.90,
    images: [
      '/images/cap_astros-galaxy_flat.jpg',
      '/images/cap_astros-galaxy_model.jpg'
    ],
    colors: ['#0d0d0d'],
    sizes: ['U'],
    badge: 'NEW',
    description: 'Boné estruturado ASTROS GALAXY com bordado em alta definição e aba curva premium.',
    category: 'accessories'
  },
  {
    id: 'cap-2',
    name: 'ASTROS STARS CAP',
    price: 149.90,
    images: [
      '/images/cap_astros-stars_flat.jpg',
      '/images/cap_astros-stars_model.jpg'
    ],
    colors: ['#0d0d0d'],
    sizes: ['U'],
    badge: 'NEW',
    description: 'Boné ASTROS STARS em sarja pesada com bordados estelares contrastantes nas laterais e frente.',
    category: 'accessories'
  },
  {
    id: 'cap-3',
    name: 'CHROME BLACK CAP',
    price: 149.90,
    images: [
      '/images/cap_chrome-black_flat.jpg',
      '/images/cap_chrome-black_model.jpg'
    ],
    colors: ['#0d0d0d'],
    sizes: ['U'],
    badge: 'NEW',
    description: 'Minimalismo escuro com atitude pesada. O Chrome Black mistura estética gótica e streetwear premium com suas cruzes cromadas que se destacam.',
    category: 'accessories',
    originalPrice: 199.90
  },
  {
    id: 'cap-4',
    name: 'LA AMIRI SKULL CAP',
    price: 169.90,
    images: [
      '/images/cap_la-amiri-skull_flat.jpg',
      '/images/cap_la-amiri-skull_model.jpg'
    ],
    colors: ['#0d0d0d'],
    sizes: ['U'],
    badge: 'NEW',
    description: 'O LA Amiri Skull combina a estética dark street com detalhes marcantes. O logo LA e o efeito de caveira criam uma vibração urbana premium.',
    category: 'accessories',
    originalPrice: 229.90
  },
  {
    id: 'cap-5',
    name: 'LA BONES CAP',
    price: 149.90,
    images: [
      '/images/cap_la-bones_flat.jpg',
      '/images/cap_la-bones_model.jpg'
    ],
    colors: ['#0d0d0d'],
    sizes: ['U'],
    badge: 'NEW',
    description: 'Boné premium LA BONES com detalhe bordado de ossos no painel frontal e fecho snapback ajustável.',
    category: 'accessories'
  }
];
