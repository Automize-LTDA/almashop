import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateAccess from './pages/PrivateAccess';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import StoreLayout from './layouts/StoreLayout';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<PrivateAccess />} />
          <Route path="/store" element={<StoreLayout />}>
            <Route index element={<Home />} />
            <Route path="product/:id" element={<ProductDetail />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
