import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Shield, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from '../contexts/AppContext';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

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
  const favoritesCount = (state.user?.savedRecipes?.length || 0) + (state.user?.savedProducts?.length || 0);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const isAdminActive = location.pathname.startsWith('/admin');

  return (
    // التعديل هنا: تحسين شكل الـ Header الثابت
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-bold text-green-600 tracking-tight">FreshMart</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={() =>
                  `transition-colors font-medium text-sm ${isActive(item.path) ? 'text-green-600 font-bold' : 'text-gray-600 hover:text-green-600'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="flex items-center space-x-2 pl-4 border-l border-gray-100">
              {isAdmin && (
                <button
                  onClick={() => navigate('/admin')}
                  className={`p-2 rounded-lg transition-colors ${
                    isAdminActive ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:text-green-600 hover:bg-gray-50'
                  }`}
                  title="Admin Dashboard"
                >
                  <Shield size={20} />
                </button>
              )}
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 text-gray-500 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-orange-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
                    aria-label="Favorites"
                  >
                    <Heart size={20} className={favoritesCount > 0 ? 'fill-red-500 text-red-500' : ''} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/saved-recipes')}>
                    Saved Recipes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/saved-products')}>
                    Saved Products
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                onClick={() => navigate(state.isAuthenticated ? '/profile' : '/login')}
                className="p-2 text-gray-500 hover:text-green-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <User size={20} />
              </button>
            </div>
          </nav>

          {/* Mobile menu button and icons */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={() => navigate('/cart')} className="relative p-2 text-gray-600">
              <ShoppingCart size={22} />
              {cartItemsCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button onClick={() => navigate('/saved-products')} className="p-2 text-gray-600">
              <Heart size={22} className={favoritesCount > 0 ? 'fill-red-500 text-red-500' : ''} />
            </button>
            <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white py-2 absolute w-full left-0 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-colors font-medium ${
                    isActive(item.path) ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
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
                  className={`block w-full text-left px-4 py-3 rounded-xl transition-colors font-medium mt-2 border-t border-gray-50 ${
                    isAdminActive ? 'bg-green-50 text-green-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Shield size={18} className="text-gray-400" />
                    Admin Dashboard
                  </div>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}