import { motion } from 'framer-motion';
import { mockProducts } from '../data/products';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = selectedCategory === 'all'
    ? mockProducts
    : mockProducts.filter(product => product.category === selectedCategory);

  const promoProducts = mockProducts.filter(product => product.originalPrice !== undefined);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero_streetwear.jpg" 
            alt="Hero Streetwear" 
            className="w-full h-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-alma-black/30 via-transparent to-alma-black" />
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center mt-32 px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white text-xs md:text-sm tracking-[0.4em] uppercase mb-4"
          >
            {t('nav.new_drop')}
          </motion.h2>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter mb-8 max-w-4xl leading-[0.9]"
          >
            No Rules.<br />No Limits.
          </motion.h1>
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-white text-black px-8 py-4 font-display uppercase tracking-[0.2em] text-sm font-bold hover:bg-black hover:text-white border border-transparent hover:border-white transition-all duration-300"
          >
            {t('nav.shop')}
          </motion.button>
        </div>
      </section>

      {/* Promotions Section */}
      {promoProducts.length > 0 && (
        <section className="py-20 px-6 max-w-[1400px] mx-auto border-b border-white/5">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.4em] text-red-500 uppercase mb-2 block">
                {t('home.special_offers_badge')}
              </span>
              <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest">
                {t('home.promotions_title')}
              </h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
            {promoProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Latest Drop Section */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-3xl md:text-5xl font-display uppercase tracking-widest">{t('home.latest_drop')}</h2>
          <button 
            onClick={() => setSelectedCategory('all')}
            className="hidden md:block text-sm uppercase tracking-[0.2em] border-b border-white pb-1 hover:text-white/60 hover:border-white/60 transition-colors"
          >
            {t('home.shop_all')}
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-8 overflow-x-auto pb-4 mb-16 border-b border-white/10 text-xs tracking-[0.2em] uppercase font-medium scrollbar-none">
          {['all', 'tshirts', 'hoodies', 'pants', 'shoes', 'accessories'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`pb-3 transition-colors relative whitespace-nowrap ${
                selectedCategory === category 
                  ? 'text-white font-semibold' 
                  : 'text-white/40 hover:text-white'
              }`}
            >
              {category === 'all' ? t('home.all_categories') : t(`nav.${category}`)}
              {selectedCategory === category && (
                <motion.div 
                  layoutId="activeCategory"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export function ProductCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      to={`/store/product/${product.id}`}
      className="group cursor-pointer flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-alma-gray mb-6 overflow-hidden">
        {product.originalPrice && (
          <div className="absolute top-4 right-4 z-20 bg-red-600 text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1">
            OFFER
          </div>
        )}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20 bg-white text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1">
            {product.badge}
          </div>
        )}
        <div className="absolute inset-0 transition-opacity duration-700 ease-in-out z-10">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}`} 
          />
        </div>
        <div className="absolute inset-0 bg-alma-dark">
          <img 
            src={product.images[1] || product.images[0]} 
            alt={`${product.name} on model`} 
            className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-105' : 'scale-100'}`} 
          />
        </div>
      </div>
      
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-medium text-sm md:text-base uppercase tracking-wider mb-2 group-hover:text-white/70 transition-colors">
            {product.name}
          </h3>
          <div className="flex gap-2">
            {product.colors.map((color: string) => (
              <div 
                key={color} 
                className="w-3 h-3 rounded-full border border-white/20"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end">
          {product.originalPrice && (
            <span className="font-display tracking-widest text-xs text-white/40 line-through mb-1">
              R$ {product.originalPrice.toFixed(2)}
            </span>
          )}
          <span className="font-display tracking-widest text-sm whitespace-nowrap text-white font-medium">
            R$ {product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </Link>
  );
}
