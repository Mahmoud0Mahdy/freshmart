import { Card, CardContent } from '../../../components/ui/card';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { Recipe } from '../types';

interface Props {
  recipes: Recipe[];
  onNavigate: (id: string | number) => void;
}

export function SimilarRecipes({ recipes, onNavigate }: Props) {
  if (recipes.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Similar Recipes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((relatedRecipe) => (
          <Card
            key={relatedRecipe.id}
            className="cursor-pointer hover:shadow-lg transition border-0 shadow-md"
            onClick={() => onNavigate(relatedRecipe.id)}
          >
            <CardContent className="p-4">
              <ImageWithFallback
                src={relatedRecipe.image}
                alt={relatedRecipe.title}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h3 className="font-semibold text-gray-900 hover:text-green-600 transition-colors">
                {relatedRecipe.title}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}