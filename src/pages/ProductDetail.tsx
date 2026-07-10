import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockProducts } from '../data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Plus, Minus } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('details');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const accordions = [
    { id: 'details', title: 'Details & Composition', content: '100% Algodão Heavyweight 240gsm. Costuras reforçadas. Lavagem estonada artesanal.' },
    { id: 'fit', title: 'Fit & Sizing', content: 'Modelagem true-to-size oversized. Para um caimento mais justo, compre um tamanho menor.' },
    { id: 'care', title: 'Care Instructions', content: 'Lavar à mão ou ciclo delicado com água fria. Não secar na máquina. Secar à sombra.' },
    { id: 'shipping', title: 'Shipping & Returns', content: 'Entregas para todo o Brasil. Trocas gratuitas até 7 dias após o recebimento.' },
  ];

  return (
    <div className="pt-32 pb-24 px-6 max-w-[1400px] mx-auto min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 mb-12">
        <Link to="/store" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to="/store" className="hover:text-white transition-colors">Shop</Link>
        <ChevronRight size={12} />
        <span className="text-white truncate">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
        {/* Image Gallery Carousel */}
        <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[65vh] bg-alma-dark overflow-hidden group">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={product.images[currentImageIndex]} 
              alt={`${product.name} view ${currentImageIndex + 1}`} 
              className="w-full h-full object-cover origin-center cursor-crosshair"
            />
          </AnimatePresence>
          
          {product.images.length > 1 && (
            <>
              {/* Arrows */}
              <button 
                onClick={() => setCurrentImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button 
                onClick={() => setCurrentImageIndex(prev => prev === product.images.length - 1 ? 0 : prev + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/80"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                {product.images.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`h-1 transition-all ${currentImageIndex === idx ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/70 w-3'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col lg:sticky lg:top-32 h-fit">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-display uppercase tracking-widest mb-4">{product.name}</h1>
            <p className="text-xl font-display tracking-wider mb-8">R$ {product.price.toFixed(2)}</p>
            <p className="text-white/70 text-sm leading-relaxed mb-8">{product.description}</p>
          </motion.div>

          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs uppercase tracking-widest text-white/70">Select Size</span>
              <button className="text-xs uppercase tracking-widest border-b border-white/30 hover:border-white transition-colors pb-0.5">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm font-medium transition-colors ${
                    selectedSize === size 
                      ? 'bg-white text-black' 
                      : 'bg-transparent border border-white/20 text-white hover:border-white/60'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center justify-between border border-white/20 px-4 py-3 w-32">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-white/60 hover:text-white transition-colors">
                <Minus size={16} />
              </button>
              <span className="text-sm font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-white/60 hover:text-white transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <button className="flex-1 bg-white text-black py-4 uppercase font-display tracking-[0.2em] font-bold hover:bg-white/90 transition-colors relative overflow-hidden group">
              <span className="relative z-10">Add to Cart</span>
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </button>
          </div>

          {/* Accordions */}
          <div className="border-t border-white/10 mt-8 pt-4">
            {accordions.map((acc) => (
              <div key={acc.id} className="border-b border-white/10">
                <button 
                  onClick={() => setActiveAccordion(activeAccordion === acc.id ? null : acc.id)}
                  className="w-full flex items-center justify-between py-6 text-sm uppercase tracking-widest font-medium hover:text-white/70 transition-colors"
                >
                  {acc.title}
                  <Plus size={16} className={`transform transition-transform duration-300 ${activeAccordion === acc.id ? 'rotate-45' : ''}`} />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: activeAccordion === acc.id ? 'auto' : 0, opacity: activeAccordion === acc.id ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 text-sm text-white/60 leading-relaxed">
                    {acc.content}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* You May Also Like */}
      <div className="border-t border-white/10 pt-24">
        <h2 className="text-2xl font-display uppercase tracking-widest mb-12 text-center">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockProducts.slice(0, 3).map(p => (
            <div key={p.id} className="group cursor-pointer">
              <div className="aspect-[3/4] bg-alma-dark mb-4 overflow-hidden">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="text-sm uppercase tracking-wider mb-2">{p.name}</h3>
              <p className="text-sm font-display tracking-widest text-white/70">R$ {p.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
