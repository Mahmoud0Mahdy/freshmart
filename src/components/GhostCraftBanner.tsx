import { useNavigate } from 'react-router-dom';
import { Sparkles, ChefHat, Sliders, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

export function GhostCraftBanner() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-r from-green-50 via-orange-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-2 border-green-200 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Left Side - Content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-orange-500 text-white px-4 py-2 rounded-full w-fit mb-4">
                <Sparkles size={20} />
                <span className="text-sm">New Feature</span>
              </div>
              
              <h2 className="text-gray-900 mb-4">
                Introducing Ghost Craft
              </h2>
              
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Create your perfect custom meal with Ghost Craft. 
                Describe any dish you want and customize every detail—from allergies to cooking method.
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <ChefHat className="text-green-600" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">Describe Your Dish</div>
                    <div className="text-xs text-gray-600">Tell us exactly what you want to eat</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <Sliders className="text-orange-600" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">Customize Everything</div>
                    <div className="text-xs text-gray-600">Control spice, portion, allergies, and more</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <ShoppingCart className="text-green-600" size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">Order Seamlessly</div>
                    <div className="text-xs text-gray-600">Add to cart and checkout like any other product</div>
                  </div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full w-fit px-8"
                onClick={() => navigate('/ghost-craft')}
              >
                <Sparkles className="mr-2" size={20} />
                Try Ghost Craft
              </Button>
            </div>
            
            {/* Right Side - Visual */}
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-200 rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-200 rounded-full opacity-20 blur-2xl"></div>
                
                {/* Main icon */}
                <div className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-12 shadow-xl">
                  <div className="flex items-center justify-center">
                    <div className="bg-white rounded-full p-8 shadow-lg">
                      <ChefHat className="text-green-600" size={80} />
                    </div>
                  </div>
                  
                  {/* Floating badges */}
                  <div className="absolute -top-4 -left-4 bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg text-sm">
                    Custom
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-green-700 text-white px-4 py-2 rounded-full shadow-lg text-sm">
                    Made for You
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
