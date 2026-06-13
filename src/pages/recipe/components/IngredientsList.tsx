import { Card, CardContent } from '../../../components/ui/card';
import { ChefHat } from 'lucide-react';

interface Props {
  ingredients: string[];
}

export function IngredientsList({ ingredients }: Props) {
  return (
    <div className="space-y-6 sticky top-8">
      <Card className="border-0 shadow-sm rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-extrabold text-gray-900 mb-5 flex items-center">
            <ChefHat size={24} className="mr-2 text-green-600" />
            Recipe Ingredients
          </h2>

          <ul className="space-y-3">
            {ingredients.map((ingredient, idx) => (
              <li
                key={idx}
                className="flex items-start text-gray-700 font-medium leading-relaxed"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-3 shrink-0 shadow-sm"></span>
                {ingredient}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}