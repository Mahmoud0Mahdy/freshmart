import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Clock, Users, ChefHat } from 'lucide-react';
import { Recipe } from '../types';

export function RecipeDetailHeader({ recipe }: { recipe: Recipe }) {
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="aspect-[4/3] relative">
          <ImageWithFallback
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-green-600 text-white">
              {recipe.difficulty}
            </Badge>
          </div>
        </div>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-8">
          <Badge variant="outline" className="mb-2 capitalize">
            {recipe.category}
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{recipe.title}</h1>
          <div className="flex items-center space-x-6 text-gray-600">
            <div className="flex items-center"><Clock size={18} className="mr-2" />{recipe.time}</div>
            <div className="flex items-center"><Users size={18} className="mr-2" />{recipe.servings}</div>
            <div className="flex items-center"><ChefHat size={18} className="mr-2" />{recipe.difficulty}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}