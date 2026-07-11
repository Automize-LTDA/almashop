import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BatsAnimation from '../components/BatsAnimation';
import { useTranslation } from 'react-i18next';

export default function PrivateAccess() {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show content after a short delay for the cinematic black screen effect
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'BATMAN' || password === 'DROP01') {
      setUnlocked(true);
      setError(false);
      // Cinematic transition to store
      setTimeout(() => {
        navigate('/store');
      }, 1800);
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <motion.div 
      initial={{ backgroundColor: '#ffffff' }}
      animate={{ backgroundColor: showContent ? '#000000' : '#ffffff' }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 h-[100dvh] w-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Bats */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-20 pointer-events-none"
          >
            <BatsAnimation />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cinematic Flash / Glitch on Unlock */}
      <AnimatePresence>
        {unlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 0.8, 0], backgroundColor: ['#000', '#fff', '#000', '#fff', '#000'] }}
            transition={{ duration: 1.5, times: [0, 0.1, 0.3, 0.4, 1] }}
            className="fixed inset-0 z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && !unlocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="z-30 flex flex-col items-center justify-center w-full max-w-md px-6"
          >
            {/* Logo */}
            <motion.h1 
              className="text-7xl md:text-8xl font-display font-bold tracking-widest text-white mb-8 uppercase"
              animate={{ opacity: [0.8, 1, 0.9, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
            >
              ALMA
            </motion.h1>

            <div className="text-center mb-6">
              <h2 className="text-2xl tracking-[0.2em] text-white/90 font-medium mb-3 uppercase">{t('private_access.title')}</h2>
              <p className="text-sm tracking-widest text-white/50 uppercase">{t('private_access.subtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value.toUpperCase())}
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`w-full max-w-[280px] bg-transparent border-b-2 text-center text-xl tracking-widest py-3 focus:outline-none transition-colors ${
                  error ? 'border-red-500 text-red-500' : 'border-white/30 focus:border-white text-white'
                }`}
                placeholder={error ? t('private_access.invalid_password') : t('private_access.password_placeholder')}
                autoFocus
              />
              
              <button 
                type="submit"
                className="mt-12 uppercase tracking-[0.3em] text-sm text-white/70 hover:text-white transition-colors duration-300 relative group overflow-hidden"
              >
                <span className="relative z-10">{t('private_access.enter_button')}</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
