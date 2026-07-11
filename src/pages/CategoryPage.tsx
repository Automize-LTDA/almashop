import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockProducts } from '../data/products';
import { ProductCard } from './Home';
import { motion } from 'framer-motion';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { t } = useTranslation();

  const filteredProducts = mockProducts.filter(
    (product) => product.category === category
  );

  const categoryName = category ? t(`nav.${category}`) : '';

  return (
    <div className="w-full min-h-screen pt-32 pb-24 px-6 max-w-[1400px] mx-auto select-none">
      {/* Breadcrumbs */}
      <div className="text-[10px] tracking-[0.3em] text-white/40 uppercase mb-8 flex items-center gap-2">
        <Link to="/store" className="hover:text-white transition-colors duration-300">
          {t('nav.shop')}
        </Link>
        <span>/</span>
        <span className="text-white/80">{categoryName}</span>
      </div>

      {/* Category Header */}
      <div className="mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display uppercase tracking-widest mb-4"
        >
          {categoryName}
        </motion.h1>
        <p className="text-xs md:text-sm tracking-widest text-white/50 uppercase">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'itens'}
        </p>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className={`grid gap-x-6 gap-y-16 ${
          category === 'accessories'
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="w-full text-center py-24 border border-white/10 bg-alma-dark flex flex-col items-center justify-center">
          <p className="text-sm tracking-widest text-white/40 uppercase mb-6">
            Nenhum produto cadastrado nesta categoria.
          </p>
          <Link 
            to="/store" 
            className="border border-white px-8 py-3 text-xs tracking-widest uppercase font-medium hover:bg-white hover:text-black transition-colors duration-300"
          >
            Voltar para a Loja
          </Link>
        </div>
      )}
    </div>
  );
}
