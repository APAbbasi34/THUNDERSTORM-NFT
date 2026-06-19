import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, ShoppingBag, LayoutDashboard, Zap, LogOut, User, TrendingUp, Wallet, Lock, PieChart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import WalletConnect from './WalletConnect';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
    { name: 'Stake', path: '/stake', icon: Lock, requiresAuth: true },
    { name: 'Earn', path: '/earn', icon: TrendingUp, requiresAuth: true },
    { name: 'Reserve', path: '/reserve', icon: Wallet, requiresAuth: true },
    { name: 'Assets', path: '/assets', icon: PieChart, requiresAuth: true },
    { name: 'My', path: '/my', icon: User, requiresAuth: true },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, requiresAuth: true },
    { name: 'Mint NFT', path: '/mint', icon: Zap, requiresAuth: true },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black-900/90 backdrop-blur-lg border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 bg-gradient-to-br from-gold-400 to-purple-500 rounded-lg flex items-center justify-center"
              style={{
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
              }}
            >
              <Zap className="w-6 h-6 text-black-900" />
            </motion.div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-purple-400"
                  style={{
                    textShadow: '0 0 20px rgba(255, 215, 0, 0.5)',
                  }}
            >
              THUNDERSTORM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              if (item.requiresAuth && !user) return null;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-gold-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <WalletConnect />
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-black-800 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-semibold hover:from-purple-400 hover:to-purple-500 transition-all"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black-900 border-t border-purple-500/30"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => {
                if (item.requiresAuth && !user) return null;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-gold-500/20 text-gold-400' 
                        : 'text-gray-400 hover:bg-black-800 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-purple-500/30">
                <div className="mb-4">
                  <WalletConnect />
                </div>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black-800 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg text-white font-semibold hover:from-purple-400 hover:to-purple-500 transition-all"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
