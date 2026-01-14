
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';
import Tracking from './pages/Tracking';
import OrderHistory from './pages/OrderHistory';
import Support from './pages/Support';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen font-sans selection:bg-brand-orange/20">
          <Navbar />
          <CartDrawer />
          <AIAssistant />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/history" element={<OrderHistory />} />
              <Route path="/track" element={<Tracking />} />
              {/* Hidden Admin Route */}
              <Route path="/hq-access-portal" element={<Admin />} />
              <Route path="/support" element={<Support />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
