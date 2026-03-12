import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from '../contexts/AppContext';
import { useState } from 'react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Recipes', path: '/recipes' },
  { name: 'Ghost Craft', path: '/ghost-craft' },
  { name: 'Community', path: '/community' },
  { name: 'Chatbot', path: '/chatbot' },
];

export function Header() {
  const { state } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  const isAdmin = state.user?.role === 'admin';

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isAdminActive = location.pathname.startsWith('/admin');

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-bold text-green-600">FreshMart</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={() =>
                  `transition-colors ${isActive(item.path) ? 'text-green-600' : 'text-gray-700 hover:text-green-600'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className={`p-2 rounded-lg transition-colors ${
                    isAdminActive ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  title="Admin Dashboard"
                >
                  <Shield size={20} />
                </button>
              )}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => navigate(state.isAuthenticated ? '/profile' : '/login')}
                className="p-2 text-gray-700 hover:text-green-600 transition-colors"
              >
                <User size={20} />
              </button>
            </div>
          </nav>

          {/* Mobile menu button and icons */}
          <div className="md:hidden flex items-center space-x-3">
            <button onClick={() => navigate('/cart')} className="relative p-2 text-gray-700">
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.path) ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {isAdmin && (
                <button
                  onClick={() => {
                    navigate('/admin');
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    isAdminActive ? 'bg-green-50 text-green-600' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield size={18} />
                    Admin Dashboard
                  </div>
                </button>
              )}
              <button
                onClick={() => {
                  navigate(state.isAuthenticated ? '/profile' : '/login');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {state.isAuthenticated ? 'Profile' : 'Login'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
