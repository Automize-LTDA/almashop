import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenCart: () => void;
  cartCount: number;
}

export default function Navbar({ onOpenCart, cartCount }: NavbarProps) {
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
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/store" className="text-2xl md:text-3xl font-display font-bold tracking-widest uppercase text-white hover:text-white/80 transition-colors">
            ALMA
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-xs tracking-[0.2em] uppercase font-medium">
            <Link to="/store" className="text-white hover:text-gray-400 transition-colors">New Drop</Link>
            <Link to="/store" className="text-white hover:text-gray-400 transition-colors">Shop</Link>
            <Link to="/store" className="text-white/60 hover:text-white transition-colors">T-Shirts</Link>
            <Link to="/store" className="text-white/60 hover:text-white transition-colors">Hoodies</Link>
            <Link to="/store" className="text-white/60 hover:text-white transition-colors">Pants</Link>
            <Link to="/store" className="text-white/60 hover:text-white transition-colors">Accessories</Link>
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
              <Link to="/store" className="text-2xl font-display font-bold tracking-widest text-white" onClick={() => setMobileMenuOpen(false)}>
                ALMA
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white text-sm tracking-widest uppercase">
                Close
              </button>
            </div>
            
            <div className="flex flex-col space-y-6 text-2xl font-display font-medium uppercase tracking-widest">
              <Link to="/store" onClick={() => setMobileMenuOpen(false)}>New Drop</Link>
              <Link to="/store" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link to="/store" className="text-white/60" onClick={() => setMobileMenuOpen(false)}>T-Shirts</Link>
              <Link to="/store" className="text-white/60" onClick={() => setMobileMenuOpen(false)}>Hoodies</Link>
              <Link to="/store" className="text-white/60" onClick={() => setMobileMenuOpen(false)}>Pants</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
