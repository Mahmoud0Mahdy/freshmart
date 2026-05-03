import { Card } from '../../../components/ui/card';
import type { Recipe } from '../../../contexts/AppContext';

interface RecipeStatsProps {
  recipes: Recipe[];
}

export function RecipeStats({ recipes }: RecipeStatsProps) {

  // 🔥 نحسب مرة واحدة بدل ما نكرر filter كتير
  const total = recipes?.length || 0;
  const easy = recipes?.filter(r => r.difficulty === 'Easy').length || 0;
  const medium = recipes?.filter(r => r.difficulty === 'Medium').length || 0;
  const hard = recipes?.filter(r => r.difficulty === 'Hard').length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

      <Card className="p-4">
        <p className="text-gray-600 text-sm mb-1">Total Recipes</p>
        <p className="text-2xl font-bold">{total}</p>
      </Card>

      <Card className="p-4">
        <p className="text-gray-600 text-sm mb-1">Easy</p>
        <p className="text-2xl text-green-600 font-bold">{easy}</p>
      </Card>

      <Card className="p-4">
        <p className="text-gray-600 text-sm mb-1">Medium</p>
        <p className="text-2xl text-orange-600 font-bold">{medium}</p>
      </Card>

      <Card className="p-4">
        <p className="text-gray-600 text-sm mb-1">Hard</p>
        <p className="text-2xl text-red-600 font-bold">{hard}</p>
      </Card>

    </div>
  );
}