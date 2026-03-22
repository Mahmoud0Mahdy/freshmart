import { Checkbox } from '../../../components/ui/checkbox';
import { Button } from '../../../components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';

interface Props {
  ingredients: string[];
  checkedIngredients: string[];
  onToggle: (ing: string) => void;
  onAddToCart: () => void;
}

export function IngredientsList({ ingredients, checkedIngredients, onToggle, onAddToCart }: Props) {
  return (
    <Card className="border-0 shadow-lg sticky top-8">
      <CardContent className="p-6">
        <h2 className="text-lg font-bold mb-4">Ingredients</h2>
        <div className="space-y-3 mb-6">
          {ingredients.map((ingredient, idx) => (
            <div key={idx} className="flex items-center space-x-3">
              <Checkbox
                checked={checkedIngredients.includes(ingredient)}
                onCheckedChange={() => onToggle(ingredient)}
              />
              <span className={checkedIngredients.includes(ingredient) ? 'line-through text-gray-400' : 'text-gray-700'}>
                {ingredient}
              </span>
            </div>
          ))}
        </div>
        <Button onClick={onAddToCart} className="w-full bg-green-600 hover:bg-green-700">
          <ShoppingCart className="mr-2" size={16} />
          Add Missing to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

export function InstructionsList({ instructions }: { instructions: string[] }) {
  return (
    <>
      <h2 className="text-xl font-bold mb-6 text-gray-900">How to make it</h2>
      <div className="space-y-6">
        {instructions.map((instruction, index) => (
          <div key={index} className="flex group">
            <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-black mr-4 shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors">
              {index + 1}
            </div>
            <p className="text-gray-700 leading-relaxed pt-1">{instruction}</p>
          </div>
        ))}
      </div>
    </>
  );
}