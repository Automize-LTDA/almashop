import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import { useState } from 'react';

export default function StoreLayout() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-alma-black text-white selection:bg-white selection:text-black font-sans">
      <Navbar onOpenCart={() => setIsCartOpen(true)} cartCount={1} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <main>
        <Outlet />
      </main>
      <footer className="border-t border-white/10 py-12 px-6 text-center text-xs text-white/40 uppercase tracking-widest">
        <p>&copy; {new Date().getFullYear()} ALMA SHOP. All rights reserved.</p>
        <p className="mt-2">No rules. No limits.</p>
      </footer>
    </div>
  );
}
