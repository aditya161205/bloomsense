import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Leaf, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, isLoggedIn, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Shop', href: '#configurator' },
    { name: 'About', href: '#about' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg shadow-lg border-b border-slate-200 dark:border-slate-800'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={handleLogoClick}>
            <div className="bg-forest-500 text-white p-1.5 rounded-lg mr-2">
              <Leaf size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
              Bloom<span className="text-forest-500">Sense</span>
            </span>
          </div>

          {/* Desktop Links - Only show if NOT logged in */}
          {!isLoggedIn && (
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-slate-600 dark:text-slate-300 hover:text-forest-600 dark:hover:text-forest-400 font-medium transition-colors cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
          
          {isLoggedIn && (
             <div className="hidden md:flex space-x-8 items-center">
                 <span className="text-slate-500 text-sm">Welcome back, John</span>
             </div>
          )}

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-5 py-2 rounded-full font-medium transition-colors flex items-center gap-2"
              >
                <User size={18} /> Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-slate-600 dark:text-slate-300 hover:text-forest-600 font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => onOpenAuth('signup')}
                  className="bg-forest-600 hover:bg-forest-700 text-white px-5 py-2 rounded-full font-medium transition-transform transform hover:scale-105 shadow-lg shadow-forest-500/30"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-600 dark:text-slate-300 p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {!isLoggedIn && navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              
              <div className="pt-4 flex flex-col space-y-3">
                {isLoggedIn ? (
                  <button 
                    onClick={() => {
                       onLogout();
                       setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-center py-2 bg-red-50 text-red-600 rounded-lg font-medium"
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        onOpenAuth('login');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-center py-2 text-slate-600 dark:text-slate-300 font-medium border border-slate-300 dark:border-slate-700 rounded-lg"
                    >
                      Login
                    </button>
                    <button 
                      onClick={() => {
                        onOpenAuth('signup');
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-center py-2 bg-forest-600 text-white rounded-lg font-medium"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;