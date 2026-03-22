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
    recipe, 
    isFavorite, 
    matchingProducts,
    allRecipes,
    addSingleProductToCart, 
    addAllMatchingToCart, 
    toggleSaveRecipe 
  } = useRecipeDetail(id);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recipe not found</h2>
        <Button onClick={() => navigate('/recipes')} className="rounded-xl">Back to Recipes</Button>
      </div>
    );
  }

  const handleSave = () => {
    if (!toggleSaveRecipe()) navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans selection:bg-green-100 selection:text-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        <Button 
          variant="ghost" 
          onClick={() => navigate('/recipes')} 
          className="mb-6 hover:bg-gray-200 rounded-xl text-gray-600 font-medium"
        >
          <ArrowLeft className="mr-2" size={18} /> Back to Recipes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* الجانب الأيسر (الصور والتعليمات) */}
          <div className="lg:col-span-2 space-y-8">
            <RecipeDetailHeader recipe={recipe} />
            
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
              <RecipeActions isFavorite={isFavorite} onSave={handleSave} />
              <InstructionsList instructions={recipe.instructions} />
            </div>
          </div>

          {/* الجانب الأيمن (المكونات والمنتجات) */}
          <div className="lg:col-span-1">
            <IngredientsList 
              ingredients={recipe.ingredients}
              matchingProducts={matchingProducts}
              onAddSingle={addSingleProductToCart}
              onAddAll={addAllMatchingToCart}
            />
          </div>
          
        </div>

        <div className="mt-16">
          <SimilarRecipes 
            recipes={getSimilarRecipes(allRecipes, recipe)} 
            onNavigate={(id) => {
              navigate(`/recipe/${id}`);
              window.scrollTo({ top: 0, behavior: 'smooth' }); // عشان يطلع لفوق لما يختار وصفة تانية
            }} 
          />
        </div>
        
      </div>
    </div>
  );
}