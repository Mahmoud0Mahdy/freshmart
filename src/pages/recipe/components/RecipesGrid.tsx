import { RecipeCard } from './RecipeCard';
import { Recipe } from '../types';

interface Props {
  recipes: Recipe[];
  onRecipeClick: (id: string | number) => void;
}

export function RecipesGrid({ recipes, onRecipeClick }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onClick={onRecipeClick} />
      ))}
    </div>
  );
}