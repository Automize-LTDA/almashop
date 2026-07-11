import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function WelcomeDiscountModal() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000); // Show modal after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText('ALMA10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 150 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:bottom-8 md:right-8 w-[290px] md:w-[320px] bg-black border border-white/20 p-5 text-white z-50 shadow-2xl flex flex-col select-none"
        >
          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-3 right-3 text-white/40 hover:text-white transition-colors duration-300"
          >
            <X size={16} strokeWidth={1.5} />
          </button>

          <div className="flex flex-col pr-6">
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 mb-1">
              {t('welcome.badge')}
            </span>
            
            <h2 className="text-sm font-display font-bold uppercase tracking-wider text-white leading-tight mb-2">
              {t('welcome.title')} — 10% OFF
            </h2>

            <p className="text-[10px] tracking-widest text-white/50 uppercase leading-relaxed mb-4">
              {t('welcome.description_short')}
            </p>

            {/* Compact Copy Box */}
            <div 
              onClick={handleCopy}
              className="flex items-center justify-between border border-white/10 bg-alma-dark/50 px-3 py-2 cursor-pointer hover:border-white/30 transition-colors duration-300 group"
            >
              <span className="font-display font-bold tracking-[0.2em] text-xs">ALMA10</span>
              <div className="flex items-center gap-1.5 text-white/50 group-hover:text-white transition-colors duration-300">
                <span className="text-[8px] tracking-widest uppercase">
                  {copied ? t('welcome.copied') : t('welcome.copy_short')}
                </span>
                {copied ? (
                  <Check size={12} className="text-green-400" />
                ) : (
                  <Copy size={12} strokeWidth={1.5} />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
