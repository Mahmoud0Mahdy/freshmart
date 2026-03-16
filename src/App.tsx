import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { AppProvider } from './contexts/AppContext';
import { AdminInitializer } from './components/AdminInitializer';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './admin/layout/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/product/ProductDetailPage';
import { CartPage } from './pages/cart/CartPage';
import { CheckoutPage } from './pages/checkout/CheckoutPage';
import { RecipesPage } from './pages/recipe/RecipesPage';
import { RecipeDetailPage } from './pages/recipe/RecipeDetailPage';
import { ChatbotPage } from '././pages/chatbot/ChatbotPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { CommunityPage } from './pages/CommunityPage';
import { GhostCraftPage } from './pages/GhostCraftPage';

import { DashboardPage } from './admin/dashboard/DashboardPage';
import { ProductsPage } from './admin/products/ProductsPage';
import { RecipesPage as AdminRecipesPage } from './admin/recipes/RecipesPage';
import { UsersPage } from './admin/users/UsersPage';
import { PostsPage } from './admin/posts/PostsPage';

export default function App() {
  return (
    <AppProvider>
      <AdminInitializer />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="recipes" element={<RecipesPage />} />
          <Route path="recipe/:id" element={<RecipeDetailPage />} />
          <Route path="chatbot" element={<ChatbotPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="community" element={<CommunityPage />} />
          <Route path="ghost-craft" element={<GhostCraftPage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="recipes" element={<AdminRecipesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="posts" element={<PostsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </AppProvider>
  );
}