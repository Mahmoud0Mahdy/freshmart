import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sparkles } from 'lucide-react';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative h-[500px] bg-gradient-to-r from-green-50 to-orange-50 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1614260025937-b4ecb6eb9165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGdyb2NlcmllcyUyMHZlZ2V0YWJsZXMlMjBmcnVpdHN8ZW58MXx8fHwxNzU5NTc3NTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Fresh groceries background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Shop Fresh. <br />
            <span className="text-green-600">Cook Smart.</span> <br />
            <span className="text-orange-500">Powered by AI.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            Discover fresh ingredients and get personalized recipe recommendations powered by artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
              onClick={() => navigate('/shop')}
            >
              Shop Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
              onClick={() => navigate('/ghost-craft')}
            >
              <Sparkles className="mr-2" size={20} />
              Ghost Craft
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3"
              onClick={() => navigate('/chatbot')}
            >
              Try Recipe Assistant
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}