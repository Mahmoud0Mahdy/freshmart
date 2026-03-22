import { useState, useMemo } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { getMatchingProducts } from '../services/cartService';
import { toast } from 'sonner';

export const useRecipeDetail = (recipeId: string | undefined) => {
  const { state, dispatch } = useApp();
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);

  const recipe = useMemo(() => 
    state.recipes.find((r: any) => String(r.id) === String(recipeId)), 
  [state.recipes, recipeId]);

  const isFavorite = useMemo(() => 
    state.user?.savedRecipes?.includes(recipe?.id) || false,
  [state.user, recipe?.id]);

  const toggleIngredient = (ingredient: string) => {
    setCheckedIngredients(prev =>
      prev.includes(ingredient) ? prev.filter(item => item !== ingredient) : [...prev, ingredient]
    );
  };

  const addMissingToCart = () => {
    if (!recipe) return;
    const missing = recipe.ingredients.filter(ing => !checkedIngredients.includes(ing));
    const products = getMatchingProducts(state.products, missing);

    if (products.length === 0) {
      toast.error('No matching products found in our store');
      return;
    }

    products.forEach(product => dispatch({ type: 'ADD_TO_CART', product, quantity: 1 }));
    toast.success(`Added ${products.length} missing ingredients to cart!`);
  };

  const toggleSaveRecipe = () => {
    if (!state.isAuthenticated) {
      toast.error('Please log in to save recipes');
      return false; // Returns false to indicate redirect needed
    }
    
    if (isFavorite) {
      dispatch({ type: 'UNSAVE_RECIPE', recipeId: recipe.id });
      toast.success('Recipe removed from favorites');
    } else {
      dispatch({ type: 'SAVE_RECIPE', recipeId: recipe.id });
      toast.success('Recipe saved to favorites');
    }
    return true;
  };

  return { 
    recipe, 
    checkedIngredients, 
    isFavorite, 
    toggleIngredient, 
    addMissingToCart, 
    toggleSaveRecipe,
    allRecipes: state.recipes
  };
};