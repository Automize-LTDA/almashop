import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Mock cart items for now
  const cartItems = [
    {
      id: '1',
      name: 'HEAVYWEIGHT OVERSIZED TEE',
      price: 189.90,
      image: '/images/product_tshirt.jpg',
      size: 'G',
      quantity: 1
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-alma-dark border-l border-white/10 z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-lg font-display tracking-widest uppercase">Cart (1)</h2>
              <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-24 h-32 bg-alma-gray overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h3 className="text-sm font-medium uppercase tracking-wider mb-1">{item.name}</h3>
                      <p className="text-xs text-white/50 uppercase">Size: {item.size}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 border border-white/20 px-2 py-1">
                        <button className="text-white/60 hover:text-white"><Minus size={14} /></button>
                        <span className="text-xs">{item.quantity}</span>
                        <button className="text-white/60 hover:text-white"><Plus size={14} /></button>
                      </div>
                      <p className="text-sm font-medium">R$ {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-white/10 bg-alma-black">
              <div className="flex justify-between text-sm uppercase tracking-wider mb-6">
                <span className="text-white/60">Subtotal</span>
                <span>R$ 189.90</span>
              </div>
              <button className="w-full bg-white text-black py-4 font-display uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-colors">
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
