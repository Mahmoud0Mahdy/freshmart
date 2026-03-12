import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { MessageCircle, Sparkles } from 'lucide-react';

export function ChatbotSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-gradient-to-r from-orange-100 to-green-100 border-0 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-md mb-6">
                <span className="text-2xl">🤖</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Not sure what to cook?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Tell us your ingredients and dietary preferences, and our AI-powered recipe assistant will suggest the perfect meal for you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center text-gray-600 mb-4 sm:mb-0">
                  <Sparkles className="mr-2 text-orange-500" size={20} />
                  <span>Personalized recommendations</span>
                </div>
                <Button 
                  size="lg" 
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                  onClick={() => navigate('/chatbot')}
                >
                  <MessageCircle className="mr-2" size={20} />
                  Ask the Chatbot
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}