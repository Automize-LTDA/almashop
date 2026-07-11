import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function WelcomeDiscountModal() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed the modal
    const isDismissed = localStorage.getItem('alma_welcome_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000); // Show modal after 3 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('alma_welcome_dismissed', 'true');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('ALMA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-6"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[360px] md:max-w-[420px] bg-alma-black border-2 border-white/20 px-6 md:px-8 py-10 md:py-12 text-center text-white select-none overflow-hidden"
            >
              {/* Decorative side accent lines */}
              <div className="absolute top-0 left-0 w-2 h-full bg-white/10" />
              <div className="absolute top-0 right-0 w-2 h-full bg-white/10" />

              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors duration-300"
              >
                <X size={20} strokeWidth={1.5} />
              </button>

              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-3 block">
                  {t('welcome.badge')}
                </span>
                
                <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-widest mb-2 leading-none">
                  {t('welcome.title')}
                </h2>
                
                <h3 className="text-6xl md:text-7xl font-display font-bold uppercase tracking-tighter text-white mb-6 leading-none">
                  10% OFF
                </h3>

                <p className="text-sm tracking-widest text-white/60 uppercase max-w-[280px] leading-relaxed mb-8">
                  {t('welcome.description')}
                </p>

                {/* Coupon Copy Box */}
                <div 
                  onClick={handleCopy}
                  className="w-full max-w-[280px] border border-white/20 bg-alma-dark flex items-center justify-between p-4 cursor-pointer hover:border-white transition-colors duration-300 group"
                >
                  <span className="font-display font-bold tracking-[0.3em] text-xl ml-2">ALMA10</span>
                  
                  <button className="text-white/60 group-hover:text-white transition-colors duration-300">
                    {copied ? (
                      <Check size={18} className="text-green-400" />
                    ) : (
                      <Copy size={18} strokeWidth={1.5} />
                    )}
                  </button>
                </div>
                
                <span className="text-[10px] font-medium tracking-wider text-white/40 mt-3">
                  {copied ? t('welcome.copied') : t('welcome.copy_tip')}
                </span>

                {/* Confirm Button */}
                <button
                  onClick={handleClose}
                  className="mt-10 w-full max-w-[280px] bg-white text-black py-4 uppercase font-display tracking-[0.2em] font-bold hover:bg-black hover:text-white border border-transparent hover:border-white transition-all duration-300"
                >
                  {t('welcome.continue')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
