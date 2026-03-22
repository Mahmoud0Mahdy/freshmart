import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useRecipeDetail } from './hooks/useRecipeDetail';
import { RecipeDetailHeader } from './components/RecipeDetailHeader';
import { RecipeActions } from './components/RecipeActions';
import { InstructionsList } from './components/InstructionsList';
import { IngredientsList } from './components/IngredientsList';
import { SimilarRecipes } from './components/SimilarRecipes';
import { getSimilarRecipes } from './services/recipeService';

export function RecipeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    recipe, checkedIngredients, isFavorite, allRecipes,
    toggleIngredient, addMissingToCart, toggleSaveRecipe 
  } = useRecipeDetail(id);

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-center items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Recipe not found</h2>
          <Button onClick={() => navigate('/recipes')}>Back to Recipes</Button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (!toggleSaveRecipe()) navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <Button variant="ghost" onClick={() => navigate('/recipes')} className="mb-6">
          <ArrowLeft className="mr-2" size={16} /> Back to Recipes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <RecipeDetailHeader recipe={recipe} />
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <RecipeActions isFavorite={isFavorite} onSave={handleSave} />
              <InstructionsList instructions={recipe.instructions} />
            </div>
          </div>

          <div>
            <IngredientsList 
              ingredients={recipe.ingredients}
              checkedIngredients={checkedIngredients}
              onToggle={toggleIngredient}
              onAddToCart={addMissingToCart}
            />
          </div>
        </div>

        <SimilarRecipes 
          recipes={getSimilarRecipes(allRecipes, recipe)} 
          onNavigate={(id) => navigate(`/recipe/${id}`)} 
        />
        
      </div>
    </div>
  );
}