import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import { CartProvider } from './context/CartContext';

// Simple tracking placeholder
const Tracking = () => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-gray-50">
    <div className="text-6xl mb-4">🛵</div>
    <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Tracking</h1>
    <p className="text-gray-500 max-w-md">
      This feature is coming soon. For now, please communicate directly with our dispatch rider via WhatsApp.
    </p>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans">
          <Navbar />
          <CartDrawer />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/track" element={<Tracking />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;