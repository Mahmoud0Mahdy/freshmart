import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { CategoriesSection } from '../components/CategoriesSection';
import { RecipesSection } from '../components/RecipesSection';
import { ChatbotSection } from '../components/ChatbotSection';
import { GhostCraftBanner } from '../components/GhostCraftBanner';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { products } from '../data/mockData';
import { Clock, Star, TrendingUp } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const featuredProducts = products.slice(0, 4);
  const dailyOffers = products.filter(p => ['1', '3', '7', '9'].includes(p.id));

  return (
    <div>
      <HeroSection />
      
      {/* Ghost Craft Banner */}
      <GhostCraftBanner />
      
      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our hand-picked selection of the freshest and highest quality products
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-md"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600 text-white">
                      Fresh
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button 
              onClick={() => navigate('/shop')}
              variant="outline" 
              size="lg" 
              className="border-green-600 text-green-600 hover:bg-green-50 px-8"
            >
              Shop All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Daily Offers Section */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="text-orange-500 mr-2" size={24} />
              <h2 className="text-3xl font-bold text-gray-900">Daily Offers</h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Limited time deals on your favorite products
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dailyOffers.map((product) => (
              <Card 
                key={product.id} 
                className="group cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-md bg-white"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden rounded-t-lg relative">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-orange-500 text-white">
                      25% OFF
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-orange-600 font-bold">${(product.price * 0.75).toFixed(2)}</span>
                      <span className="text-gray-400 line-through text-sm">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <CategoriesSection />
      <RecipesSection />
      <ChatbotSection />
    </div>
  );
}