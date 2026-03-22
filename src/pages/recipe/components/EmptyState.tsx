import { ChefHat } from 'lucide-react';
import { Button } from '../../../components/ui/button';

interface Props {
  onClear: () => void;
}

export function EmptyState({ onClear }: Props) {
  return (
    <div className="text-center py-12">
      <ChefHat className="mx-auto text-gray-400 mb-4" size={64} />
      <p className="text-gray-500 text-lg">No recipes found matching your criteria.</p>
      <Button onClick={onClear} variant="outline" className="mt-4">
        Clear Filters
      </Button>
    </div>
  );
}