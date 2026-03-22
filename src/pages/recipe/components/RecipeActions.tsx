import { Button } from '../../../components/ui/button';
import { Heart } from 'lucide-react';

interface Props {
  isFavorite: boolean;
  onSave: () => void;
}

export function RecipeActions({ isFavorite, onSave }: Props) {
  return (
    <div className="mb-8">
      <Button 
        onClick={onSave} 
        variant={isFavorite ? "default" : "outline"}
        size="lg"
        className={`w-full sm:w-auto rounded-xl font-bold transition-all ${
          isFavorite 
            ? 'bg-red-50 hover:bg-red-100 text-red-600 border-0 shadow-none' 
            : 'hover:bg-gray-50'
        }`}
      >
        <Heart 
          size={20} 
          className={`mr-2 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
        />
        {isFavorite ? 'Saved to Favorites' : 'Save Recipe'}
      </Button>
    </div>
  );
}