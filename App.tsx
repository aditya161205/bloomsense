import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import PotConfigurator from './components/PotConfigurator';
import About from './components/About';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';
import { AnimatePresence } from 'framer-motion';
import { useCart } from './context/CartContext';
import { CartItem } from './types';

const App: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // State to hold item pending addition to cart while logging in
  const [pendingCartItem, setPendingCartItem] = useState<CartItem | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'cart' | 'orders' | 'support'>('overview');

  const { addToCart } = useCart();

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsAuthOpen(false);

    // If there was an item waiting to be added, add it now and go to cart
    if (pendingCartItem) {
      addToCart(pendingCartItem);
      setPendingCartItem(null);
      setDashboardTab('cart');
    } else {
      setDashboardTab('overview');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDashboardTab('overview');
  };

  const handleAddToCart = (item: CartItem) => {
    if (isLoggedIn) {
      addToCart(item);
      setDashboardTab('cart');
      // Scroll to top if needed
      window.scrollTo(0, 0);
    } else {
      setPendingCartItem(item);
      setAuthMode('login'); // Require login to save cart
      setIsAuthOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-forest-500 selection:text-white">
      <Navbar onOpenAuth={openAuth} isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} initialTab={dashboardTab} />
      ) : (
        <main className="flex-grow">
          <div id="home">
            <Hero onCtaClick={() => document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })} />
          </div>
          
          <div id="features" className="scroll-mt-24">
            <Features />
          </div>
          
          <div id="configurator" className="scroll-mt-28 bg-white dark:bg-slate-900 py-20 transition-colors duration-500">
            <PotConfigurator onAddToCart={handleAddToCart} />
          </div>

          <div id="about" className="scroll-mt-24">
            <About />
          </div>
        </main>
      )}

      {/* Footer - Only show on landing page for cleaner dashboard look */}
      {!isLoggedIn && (
        <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">BloomSense</h3>
              <p className="text-sm">Merging technology with nature to keep your plants thriving, effortlessly.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-forest-400 transition">Sensors</a></li>
                <li><a href="#" className="hover:text-forest-400 transition">Smart Pots</a></li>
                <li><a href="#" className="hover:text-forest-400 transition">App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-forest-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-forest-400 transition">Careers</a></li>
                <li><a href="#" className="hover:text-forest-400 transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Stay Connected</h4>
              <div className="flex space-x-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-forest-600 transition cursor-pointer"></div>
                <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-forest-600 transition cursor-pointer"></div>
                <div className="w-8 h-8 bg-slate-800 rounded-full hover:bg-forest-600 transition cursor-pointer"></div>
              </div>
            </div>
          </div>
        </footer>
      )}

      <AnimatePresence>
        {isAuthOpen && (
          <AuthModal 
            key="auth-modal"
            mode={authMode} 
            onClose={() => setIsAuthOpen(false)} 
            onSwitchMode={(mode) => setAuthMode(mode)}
            onLogin={handleLogin}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;