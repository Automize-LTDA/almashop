import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenCart, cartCount }: NavbarProps) {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-40 transition-all duration-500 ${
          scrolled ? 'bg-alma-black/90 backdrop-blur-md py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative">
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/store" className="flex items-center md:static absolute left-1/2 -translate-x-1/2 md:translate-x-0">
            <img 
              src="/images/favicon.png" 
              alt="ALMA Logo" 
              className="h-12 md:h-14 object-contain hover:opacity-80 transition-opacity" 
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-medium">
            <Link to="/store" className="text-white hover:text-gray-400 transition-colors">{t('nav.new_drop')}</Link>
            <Link to="/store" className="text-white hover:text-gray-400 transition-colors">{t('nav.shop')}</Link>
            <Link to="/store" className="text-white/60 hover:text-white transition-colors">{t('nav.tshirts')}</Link>
            <Link to="/store" className="text-white/60 hover:text-white transition-colors">{t('nav.hoodies')}</Link>
            <Link to="/store" className="text-white/60 hover:text-white transition-colors">{t('nav.pants')}</Link>
            <Link to="/store" className="text-white/60 hover:text-white transition-colors">{t('nav.accessories')}</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <button className="text-white hover:text-gray-400 transition-colors hidden md:block">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="text-white hover:text-gray-400 transition-colors hidden md:block">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button 
              className="text-white hover:text-gray-400 transition-colors relative"
              onClick={onOpenCart}
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-alma-black z-50 flex flex-col px-6 py-8"
          >
            <div className="flex justify-between items-center mb-12">
              <Link to="/store" className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                <img 
                  src="/images/favicon.png" 
                  alt="ALMA Logo" 
                  className="h-8 object-contain" 
                />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white text-sm tracking-widest uppercase">
                Close
              </button>
            </div>
            
            <div className="flex flex-col space-y-6 text-2xl font-display font-medium uppercase tracking-widest">
              <Link to="/store" onClick={() => setMobileMenuOpen(false)}>{t('nav.new_drop')}</Link>
              <Link to="/store" onClick={() => setMobileMenuOpen(false)}>{t('nav.shop')}</Link>
              <Link to="/store" className="text-white/60" onClick={() => setMobileMenuOpen(false)}>{t('nav.tshirts')}</Link>
              <Link to="/store" className="text-white/60" onClick={() => setMobileMenuOpen(false)}>{t('nav.hoodies')}</Link>
              <Link to="/store" className="text-white/60" onClick={() => setMobileMenuOpen(false)}>{t('nav.pants')}</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
