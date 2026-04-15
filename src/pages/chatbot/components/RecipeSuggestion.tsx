import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Clock, Users } from 'lucide-react';
import { recipes } from '../../../data/mockData';
import { useChatbotContext } from '../../../contexts/ChatbotContext';

export function RecipeSuggestion({ recipeId }: { recipeId: string }) {
  const navigate = useNavigate();
  const { setFloatingOpen } = useChatbotContext();
  const recipe = recipes.find(r => r.id === recipeId);

  if (!recipe) return null;

  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow border border-gray-200 mt-3"
      onClick={() => {
        navigate(`/recipe/${recipe.id}`);
        setFloatingOpen(false); 
      }}
    >
      <CardContent className="p-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
            <ImageWithFallback src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-gray-900 text-sm truncate">{recipe.title}</h4>
            <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
              <span className="flex items-center"><Clock size={10} className="mr-1" />{recipe.time}</span>
              <span className="flex items-center"><Users size={10} className="mr-1" />{recipe.servings}</span>
              <Badge variant="outline" className="text-[10px] py-0">{recipe.difficulty}</Badge>
            </div>
          </div>
        </div>      </CardContent>
    </Card>
  );
}