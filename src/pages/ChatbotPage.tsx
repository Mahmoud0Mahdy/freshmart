import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { recipes } from '../data/mockData';
import { Send, Bot, User, Sparkles, Clock, Users, ChefHat } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recipes?: string[];
  timestamp: Date;
}

export function ChatbotPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI cooking assistant. Tell me what ingredients you have, your dietary preferences, or what type of meal you're looking for, and I'll suggest the perfect recipes for you!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedPrompts = [
    "I have chicken, rice, and vegetables",
    "Quick lunch ideas under 20 minutes",
    "Healthy breakfast recipes",
    "Vegetarian dinner options",
    "Easy desserts for beginners"
  ];

  const generateResponse = (userMessage: string): { content: string; recipes?: string[] } => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword-based recipe suggestions
    let suggestedRecipes: string[] = [];
    
    if (lowerMessage.includes('chicken') || lowerMessage.includes('pasta')) {
      suggestedRecipes = ['1']; // Pasta Primavera
    } else if (lowerMessage.includes('salad') || lowerMessage.includes('healthy') || lowerMessage.includes('vegetables')) {
      suggestedRecipes = ['2']; // Garden Salad
    } else if (lowerMessage.includes('sandwich') || lowerMessage.includes('lunch') || lowerMessage.includes('quick')) {
      suggestedRecipes = ['3']; // Gourmet Sandwich
    } else if (lowerMessage.includes('breakfast') || lowerMessage.includes('smoothie')) {
      suggestedRecipes = ['4']; // Smoothie Bowl
    } else if (lowerMessage.includes('stir') || lowerMessage.includes('fry') || lowerMessage.includes('asian')) {
      suggestedRecipes = ['5']; // Stir-Fry Vegetables
    } else if (lowerMessage.includes('dessert') || lowerMessage.includes('cookie') || lowerMessage.includes('sweet')) {
      suggestedRecipes = ['6']; // Chocolate Chip Cookies
    } else if (lowerMessage.includes('easy') || lowerMessage.includes('beginner')) {
      suggestedRecipes = ['2', '3', '4']; // Easy recipes
    } else if (lowerMessage.includes('under 20') || lowerMessage.includes('quick')) {
      suggestedRecipes = ['2', '3', '4', '5']; // Quick recipes
    } else {
      // Default suggestions
      suggestedRecipes = ['1', '2', '3'];
    }

    let response = "";
    if (suggestedRecipes.length > 0) {
      response = `Based on what you've told me, I have some great recipe suggestions for you! These recipes match your preferences and ingredients. Click on any recipe below to view the full details and cooking instructions.`;
    } else {
      response = `I'd love to help you find the perfect recipe! Could you tell me more about what ingredients you have available, or what type of meal you're in the mood for? For example, you could say "I have chicken and rice" or "I want something healthy and quick".`;
    }

    return { content: response, recipes: suggestedRecipes };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        recipes: response.recipes,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4">
            <Bot size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Recipe Assistant</h1>
          <p className="text-gray-600">Tell me your ingredients and preferences, and I'll find the perfect recipe for you!</p>
        </div>

        {/* Chat Container */}
        <Card className="border-0 shadow-lg mb-6" style={{ height: '500px' }}>
          <CardContent className="p-0 h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-start space-x-3 ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`rounded-lg p-4 ${
                        message.role === 'user' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-white border border-gray-200'
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        
                        {/* Recipe Suggestions */}
                        {message.recipes && message.recipes.length > 0 && (
                          <div className="mt-4 space-y-3">
                            {message.recipes.map((recipeId) => {
                              const recipe = recipes.find(r => r.id === recipeId);
                              if (!recipe) return null;
                              
                              return (
                                <Card 
                                  key={recipe.id}
                                  className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200"
                                  onClick={() => navigate(`/recipe/${recipe.id}`)}
                                >
                                  <CardContent className="p-3">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                                        <ImageWithFallback
                                          src={recipe.image}
                                          alt={recipe.title}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-gray-900 text-sm truncate">{recipe.title}</h4>
                                        <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                                          <span className="flex items-center">
                                            <Clock size={10} className="mr-1" />
                                            {recipe.time}
                                          </span>
                                          <span className="flex items-center">
                                            <Users size={10} className="mr-1" />
                                            {recipe.servings}
                                          </span>
                                          <Badge variant="outline" className="text-xs py-0">
                                            {recipe.difficulty}
                                          </Badge>
                                        </div>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <Sparkles size={16} className="text-green-600 animate-pulse" />
                        <span className="text-sm text-gray-600">Thinking of the perfect recipe...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex space-x-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Tell me what ingredients you have or what you're craving..."
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Prompts */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Need inspiration? Try these:</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {suggestedPrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="justify-start text-left h-auto p-3"
                  disabled={isLoading}
                >
                  <Sparkles size={16} className="mr-2 text-green-600" />
                  {prompt}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}