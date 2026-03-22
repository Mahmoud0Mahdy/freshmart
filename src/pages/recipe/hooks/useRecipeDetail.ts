import { useState, useMemo } from 'react';
import { useApp } from '../../../contexts/AppContext';
import { getMatchingProducts } from '../services/cartService';
import { toast } from 'sonner';
import type { Product } from '../../../contexts/AppContext';

export const useRecipeDetail = (recipeId: string | undefined) => {
  const { state, dispatch } = useApp();

  const recipe = useMemo(() => 
    state.recipes.find((r: any) => String(r.id) === String(recipeId)), 
  [state.recipes, recipeId]);

  const isFavorite = useMemo(() => 
    state.user?.savedRecipes?.includes(recipe?.id) || false,
  [state.user, recipe?.id]);

  // حساب المنتجات المتاحة في المتجر اللي بتطابق مكونات الوصفة
  const matchingProducts = useMemo(() => {
    if (!recipe) return [];
    return getMatchingProducts(state.products, recipe.ingredients);
  }, [recipe, state.products]);

  // إضافة منتج واحد للسلة
  const addSingleProductToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', product, quantity: 1 });
    toast.success(`${product.name} added to cart!`);
  };

  // إضافة كل المنتجات المتطابقة للسلة
  const addAllMatchingToCart = () => {
    if (matchingProducts.length === 0) return;
    matchingProducts.forEach(product => dispatch({ type: 'ADD_TO_CART', product, quantity: 1 }));
    toast.success(`Added ${matchingProducts.length} items to cart!`);
  };

  const toggleSaveRecipe = () => {
    if (!state.isAuthenticated) {
      toast.error('Please log in to save recipes');
      return false; 
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
    isFavorite, 
    matchingProducts,
    addSingleProductToCart,
    addAllMatchingToCart, 
    toggleSaveRecipe,
    allRecipes: state.recipes
  };
};