import { Button } from '../../../components/ui/button';
import { Heart, Share2 } from 'lucide-react';

interface Props {
  isFavorite: boolean;
  onSave: () => void;
}

export function RecipeActions({ isFavorite, onSave }: Props) {
  return (
    <div className="flex space-x-4 mb-6">
      <Button onClick={onSave} variant="outline">
        <Heart size={16} className={`mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
        {isFavorite ? 'Saved' : 'Save Recipe'}
      </Button>

      <Button variant="outline">
        <Share2 className="mr-2" size={16} />
        Share
      </Button>
    </div>
  );
}